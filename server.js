import express from "express";
import cors from "cors";
import crypto from "node:crypto";
import Razorpay from "razorpay";
import Database from "better-sqlite3";
import "dotenv/config";

const app = express();
const port = 3001;

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

if (!razorpayKeyId || !razorpayKeySecret) {
  throw new Error("Missing Razorpay environment variables.");
}

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

const db = new Database("orders.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    paymentId TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL,
    signature TEXT NOT NULL,
    customer TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    status TEXT NOT NULL
  );
`);

app.use(cors());
app.use(express.json());

app.post("/api/create-order", async (req, res) => {
  const amount = Number(req.body.amount);
  const receipt = String(req.body.receipt || `order_${Date.now()}`);

  if (!Number.isFinite(amount) || amount < 100) {
    return res.status(400).json({ message: "Amount must be at least 100 paise." });
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt,
    });

    return res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: razorpayKeyId,
    });
  } catch (error) {
    const description = error?.error?.description || error?.message || "";
    const isAuthFailure =
      error?.statusCode === 401 ||
      error?.error?.code === "BAD_REQUEST_ERROR" ||
      /authentication failed/i.test(description);

    const statusCode = isAuthFailure ? 401 : 500;
    const message = isAuthFailure
      ? "Razorpay authentication failed. Please confirm the configured test keys are valid for the active account."
      : description || "Unable to create Razorpay order.";

    return res.status(statusCode).json({ message });
  }
});

app.post("/api/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Missing payment verification fields." });
  }

  const generatedSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(generatedSignature);
  const receivedBuffer = Buffer.from(razorpay_signature);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return res.status(400).json({ message: "Payment signature mismatch." });
  }

  const isValid = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!isValid) {
    return res.status(400).json({ message: "Payment signature mismatch." });
  }

  return res.json({ success: true, message: "Payment verified successfully." });
});

app.post("/api/orders", (req, res) => {
  const { orderId, paymentId, amount, currency, signature, customer } = req.body ?? {};

  if (!orderId || !paymentId || !amount || !currency || !signature) {
    return res.status(400).json({ message: "Missing order record fields." });
  }

  const record = {
    id: `order_${Date.now()}`,
    orderId,
    paymentId,
    amount,
    currency,
    signature,
    customer: JSON.stringify(customer ?? {}),
    createdAt: new Date().toISOString(),
    status: "Pending",
  };

  db.prepare(
    `
      INSERT INTO orders (id, orderId, paymentId, amount, currency, signature, customer, createdAt, status)
      VALUES (@id, @orderId, @paymentId, @amount, @currency, @signature, @customer, @createdAt, @status)
    `,
  ).run(record);

  return res.status(201).json({
    success: true,
    message: "Order record saved.",
    order: record,
  });
});

app.get("/api/orders", (_req, res) => {
  const rows = db.prepare(`SELECT * FROM orders ORDER BY createdAt DESC`).all();
  const orders = rows.map((row) => ({
    ...row,
    customer: JSON.parse(row.customer),
  }));

  return res.json({ orders });
});

app.patch("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body ?? {};
  const allowedStatuses = ["Pending", "Packed", "Shipped"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status." });
  }

  const existing = db.prepare(`SELECT * FROM orders WHERE id = ?`).get(id);
  if (!existing) {
    return res.status(404).json({ message: "Order not found." });
  }

  const updated = {
    ...existing,
    status,
  };

  db.prepare(`UPDATE orders SET status = ? WHERE id = ?`).run(status, id);

  return res.json({ success: true, message: "Order updated.", order: updated });
});

app.delete("/api/orders", (_req, res) => {
  db.prepare(`DELETE FROM orders`).run();
  return res.json({ success: true, message: "Order records cleared." });
});

app.listen(port, () => {
  console.log(`Razorpay backend running on http://localhost:${port}`);
});
