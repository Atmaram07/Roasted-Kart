import { applyCors } from "../_cors.js";
import { getPool, ensureSchema } from "../_db.js";

function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

function toCamelCase(row) {
  return {
    id: row.id,
    orderId: row.order_id,
    paymentId: row.payment_id,
    amount: row.amount,
    currency: row.currency,
    signature: row.signature,
    customer: row.customer,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
  };
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { orderId, phone } = req.body ?? {};

  if (!orderId || !phone) {
    return res.status(400).json({ message: "Order ID and phone number are required." });
  }

  try {
    await ensureSchema();
    const pool = getPool();
    const normalizedPhone = normalizePhone(phone);

    const { rows } = await pool.query(
      `SELECT * FROM orders WHERE order_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [String(orderId).trim()],
    );

    const row = rows[0];

    if (!row) {
      return res.status(404).json({ message: "We could not find an order with that Order ID." });
    }

    const customerPhone = normalizePhone(row.customer?.phone);

    if (!customerPhone || customerPhone !== normalizedPhone) {
      return res.status(404).json({ message: "Order ID and phone number do not match our records." });
    }

    return res.status(200).json({
      success: true,
      order: toCamelCase(row),
    });
  } catch (error) {
    return res.status(500).json({ message: error?.message || "Database error." });
  }
}
