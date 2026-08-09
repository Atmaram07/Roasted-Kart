// One-time migration: copies existing rows from the local orders.db (SQLite)
// into your new Postgres database.
//
// Usage:
//   1. Set POSTGRES_URL in a .env file (copy the value from your Vercel project's
//      Environment Variables page — it was created automatically by the
//      Vercel-Supabase integration).
//   2. Run: npm run migrate:postgres
//      (Requires Node 22+ for built-in SQLite support — no native module to build.)
//
// Safe to run once. Re-running will not duplicate rows (uses ON CONFLICT DO NOTHING).

import "dotenv/config";
import { DatabaseSync } from "node:sqlite";
import { Pool } from "pg";

async function migrate() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("Missing POSTGRES_URL. Copy it from Vercel's Environment Variables page into your local .env file.");
    process.exit(1);
  }

  const sqliteDb = new DatabaseSync("orders.db", { readOnly: true });
  const rows = sqliteDb.prepare(`SELECT * FROM orders`).all();

  if (rows.length === 0) {
    console.log("No rows found in orders.db — nothing to migrate.");
    return;
  }

  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      payment_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL,
      signature TEXT NOT NULL,
      customer JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL,
      status TEXT NOT NULL
    );
  `);

  let migrated = 0;

  for (const row of rows) {
    await pool.query(
      `INSERT INTO orders (id, order_id, payment_id, amount, currency, signature, customer, created_at, updated_at, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO NOTHING`,
      [
        row.id,
        row.orderId,
        row.paymentId,
        row.amount,
        row.currency,
        row.signature,
        row.customer, // already a JSON string from SQLite
        row.createdAt,
        row.updatedAt || row.createdAt,
        row.status,
      ],
    );
    migrated += 1;
  }

  console.log(`Migrated ${migrated} order(s) from orders.db into Postgres.`);
  await pool.end();
}

migrate().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
