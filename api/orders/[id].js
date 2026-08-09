import { applyCors } from "../_cors.js";
import { getPool, ensureSchema } from "../_db.js";

const allowedStatuses = ["Pending", "Packed", "Shipped"];

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

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { id } = req.query;
  const { status } = req.body ?? {};

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status." });
  }

  try {
    await ensureSchema();
    const pool = getPool();

    const { rows: existingRows } = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
    const existing = existingRows[0];

    if (!existing) {
      return res.status(404).json({ message: "Order not found." });
    }

    const updatedAt = new Date().toISOString();
    await pool.query(`UPDATE orders SET status = $1, updated_at = $2 WHERE id = $3`, [status, updatedAt, id]);

    return res.status(200).json({
      success: true,
      message: "Order updated.",
      order: { ...toCamelCase(existing), status, updatedAt },
    });
  } catch (error) {
    return res.status(500).json({ message: error?.message || "Database error." });
  }
}
