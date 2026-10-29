import crypto from "node:crypto";
import { applyCors } from "./_cors.js";
import { requireAdmin } from "./_admin-auth.js";
import { getPool, ensureSchema } from "./_db.js";
import { razorpayKeySecret } from "./_razorpay.js";

function toCamelCase(row) {
  return {
    id: row.id, orderId: row.order_id, paymentId: row.payment_id,
    amount: row.amount, currency: row.currency, customer: row.customer,
    createdAt: row.created_at, updatedAt: row.updated_at, status: row.status,
  };
}

function isValidPaymentSignature(orderId, paymentId, signature) {
  if (!orderId || !paymentId || !signature || !razorpayKeySecret) return false;
  const expected = crypto.createHmac("sha256", razorpayKeySecret)
    .update(`${orderId}|${paymentId}`).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(String(signature));
  return expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method === "GET" || req.method === "DELETE") {
    if (!requireAdmin(req, res)) return;
  }

  try {
    await ensureSchema();
    const pool = getPool();

    if (req.method === "GET") {
      const { rows } = await pool.query(`SELECT * FROM orders ORDER BY created_at DESC`);
      return res.status(200).json({ orders: rows.map(toCamelCase) });
    }

    if (req.method === "POST") {
      const { orderId, paymentId, amount, currency, signature, customer } = req.body ?? {};
      if (!orderId || !paymentId || !amount || !currency || !signature ||
          !customer?.name || !customer?.phone || !customer?.address) {
        return res.status(400).json({ message: "Missing required order or customer fields." });
      }
      if (!Number.isSafeInteger(Number(amount)) || Number(amount) < 100 || currency !== "INR") {
        return res.status(400).json({ message: "Invalid order amount or currency." });
      }
      if (!isValidPaymentSignature(String(orderId), String(paymentId), String(signature))) {
        return res.status(400).json({ message: "Payment signature could not be verified." });
      }

      const duplicate = await pool.query(
        `SELECT id FROM orders WHERE order_id = $1 OR payment_id = $2 LIMIT 1`,
        [String(orderId), String(paymentId)],
      );
      if (duplicate.rows.length) {
        return res.status(409).json({ message: "This payment has already been recorded." });
      }

      const now = new Date().toISOString();
      const record = {
        id: `order_${crypto.randomUUID()}`,
        orderId: String(orderId), paymentId: String(paymentId),
        amount: Number(amount), currency: String(currency),
        customer: {
          name: String(customer.name).trim().slice(0, 120),
          email: String(customer.email || "").trim().slice(0, 254),
          phone: String(customer.phone).trim().slice(0, 30),
          address: String(customer.address).trim().slice(0, 1000),
          notes: String(customer.notes || "").trim().slice(0, 1000),
        },
        createdAt: now, updatedAt: now, status: "Pending",
      };

      await pool.query(
        `INSERT INTO orders (id, order_id, payment_id, amount, currency, signature, customer, created_at, updated_at, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [record.id, record.orderId, record.paymentId, record.amount, record.currency,
          String(signature), JSON.stringify(record.customer), record.createdAt, record.updatedAt, record.status],
      );
      return res.status(201).json({ success: true, message: "Order record saved.", order: record });
    }

    if (req.method === "DELETE") {
      await pool.query(`DELETE FROM orders`);
      return res.status(200).json({ success: true, message: "Order records cleared." });
    }
    return res.status(405).json({ message: "Method not allowed." });
  } catch (error) {
    console.error("Orders API error:", error);
    return res.status(500).json({ message: "Unable to process order request." });
  }
}
