import express from "express";
import cors from "cors";
import crypto from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import "dotenv/config";

const app = express();
const port = Number(process.env.PORT || 3001);
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);
const distDirPath = path.join(currentDirPath, "dist");
const distIndexPath = path.join(distDirPath, "index.html");

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

if (!razorpayKeyId || !razorpayKeySecret) {
  throw new Error("Missing Razorpay environment variables.");
}

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

const orderColumns = db.prepare(`PRAGMA table_info(orders)`).all();
const hasUpdatedAtColumn = orderColumns.some((column) => column.name === "updatedAt");

if (!hasUpdatedAtColumn) {
  db.exec(`ALTER TABLE orders ADD COLUMN updatedAt TEXT`);
  db.exec(`UPDATE orders SET updatedAt = createdAt WHERE updatedAt IS NULL OR updatedAt = ''`);
}

app.use(cors());
app.use(express.json());

async function createRazorpayOrder({ amount, receipt }) {
  const authToken = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt,
    }),
  });

  const rawText = await response.text();
  const payload = rawText ? JSON.parse(rawText) : {};

  if (!response.ok) {
    const description = payload?.error?.description || payload?.error?.reason || payload?.message || "";
    const isAuthFailure = response.status === 401 || /authentication failed/i.test(description);
    const message = isAuthFailure
      ? "Razorpay authentication failed. Please confirm the configured test keys are valid for the active account."
      : description || "Unable to create Razorpay order.";

    throw Object.assign(new Error(message), {
      statusCode: isAuthFailure ? 401 : response.status || 500,
    });
  }

  return payload;
}

app.post("/api/create-order", async (req, res) => {
  const amount = Number(req.body.amount);
  const receipt = String(req.body.receipt || `order_${Date.now()}`);

  if (!Number.isFinite(amount) || amount < 100) {
    return res.status(400).json({ message: "Amount must be at least 100 paise." });
  }

  try {
    const order = await createRazorpayOrder({ amount, receipt });

    return res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: razorpayKeyId,
    });
  } catch (error) {
    const message = error?.message || "Unable to create Razorpay order.";
    const statusCode = Number(error?.statusCode) || 500;

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
    updatedAt: new Date().toISOString(),
    status: "Pending",
  };

  db.prepare(
    `
      INSERT INTO orders (id, orderId, paymentId, amount, currency, signature, customer, createdAt, updatedAt, status)
      VALUES (@id, @orderId, @paymentId, @amount, @currency, @signature, @customer, @createdAt, @updatedAt, @status)
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
    updatedAt: new Date().toISOString(),
  };

  db.prepare(`UPDATE orders SET status = ?, updatedAt = ? WHERE id = ?`).run(updated.status, updated.updatedAt, id);

  return res.json({ success: true, message: "Order updated.", order: updated });
});

app.delete("/api/orders", (_req, res) => {
  db.prepare(`DELETE FROM orders`).run();
  return res.json({ success: true, message: "Order records cleared." });
});

app.use("/api", (_req, res) => {
  return res.status(404).json({ message: "API route not found." });
});

if (existsSync(distIndexPath)) {
  app.use(express.static(distDirPath));

  app.get(/^(?!\/api).*/, (_req, res) => {
    return res.sendFile(distIndexPath);
  });
}

app.listen(port, () => {
  console.log(`RoastedKart server running on http://localhost:${port}`);
});
