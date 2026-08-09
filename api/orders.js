import { applyCors } from "./_cors.js";
import { getPool, ensureSchema } from "./_db.js";

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

  try {
    await ensureSchema();
    const pool = getPool();

    if (req.method === "GET") {
      const { rows } = await pool.query(`SELECT * FROM orders ORDER BY created_at DESC`);
      return res.status(200).json({ orders: rows.map(toCamelCase) });
    }

    if (req.method === "POST") {
      const { orderId, paymentId, amount, currency, signature, customer } = req.body ?? {};

      if (!orderId || !paymentId || !amount || !currency || !signature) {
        return res.status(400).json({ message: "Missing order record fields." });
      }

      const now = new Date().toISOString();
      const record = {
        id: `order_${Date.now()}`,
        orderId,
        paymentId,
        amount,
        currency,
        signature,
        customer: customer ?? {},
        createdAt: now,
        updatedAt: now,
        status: "Pending",
      };

      await pool.query(
        `INSERT INTO orders (id, order_id, payment_id, amount, currency, signature, customer, created_at, updated_at, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          record.id,
          record.orderId,
          record.paymentId,
          record.amount,
          record.currency,
          record.signature,
          JSON.stringify(record.customer),
          record.createdAt,
          record.updatedAt,
          record.status,
        ],
      );

      return res.status(201).json({ success: true, message: "Order record saved.", order: record });
    }

    if (req.method === "DELETE") {
      await pool.query(`DELETE FROM orders`);
      return res.status(200).json({ success: true, message: "Order records cleared." });
    }

    return res.status(405).json({ message: "Method not allowed." });
  } catch (error) {
    return res.status(500).json({ message: error?.message || "Database error." });
  }
}
