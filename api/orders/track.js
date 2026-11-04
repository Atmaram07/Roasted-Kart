import { createHash } from "node:crypto";
import { applyCors } from "../_cors.js";
import { getPool, ensureSchema } from "../_db.js";

function normalizePhone(value) {
  const digits = String(value || "").replace(/\\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

function toCamelCase(row) {
  return {
    id: row.id,
    orderId: row.order_id,
    amount: row.amount,
    currency: row.currency,
    customer: { name: String(row.customer?.name || "").slice(0, 120) },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
  };
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed." });

  const { token, orderId, phone } = req.body ?? {};
  if (!token && (!orderId || !phone)) {
    return res.status(400).json({ message: "Use your secure email tracking link, or enter your order ID and phone number." });
  }

  try {
    await ensureSchema();
    const pool = getPool();
    let row;

    if (token) {
      const hash = createHash("sha256").update(String(token)).digest("hex");
      const result = await pool.query(
        "SELECT * FROM orders WHERE tracking_token_hash = $1 LIMIT 1",
        [hash],
      );
      row = result.rows[0];
    } else {
      // Legacy order lookup remains available for older orders without an email token.
      const result = await pool.query(
        "SELECT * FROM orders WHERE order_id = $1 ORDER BY created_at DESC LIMIT 1",
        [String(orderId).trim()],
      );
      row = result.rows[0];
      const suppliedPhone = normalizePhone(phone);
      if (!row || !normalizePhone(row.customer?.phone) || normalizePhone(row.customer.phone) !== suppliedPhone) {
        return res.status(404).json({ message: "Order ID and phone number do not match our records." });
      }
    }

    if (!row) return res.status(404).json({ message: "We could not find an order for this tracking link." });
    return res.status(200).json({ success: true, order: toCamelCase(row) });
  } catch (error) {
    console.error("Order tracking API error:", error);
    return res.status(500).json({ message: "Unable to track this order right now." });
  }
}
