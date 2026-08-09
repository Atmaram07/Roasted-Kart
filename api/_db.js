import { Pool } from "pg";

// Reused across warm serverless invocations (Vercel keeps the process alive between
// requests for a short time), so we don't open a new pool on every request.
let pool;

export function getPool() {
  if (!pool) {
    // POSTGRES_URL is created automatically by the Vercel + Supabase integration.
    // Falls back to DATABASE_URL in case you're using a different Postgres provider.
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error(
        "Missing POSTGRES_URL environment variable. This should be set automatically by the Vercel-Supabase integration.",
      );
    }

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }

  return pool;
}

let schemaReady;

// Creates the orders table if it doesn't exist yet. Safe to call on every cold start.
export async function ensureSchema() {
  if (schemaReady) {
    return schemaReady;
  }

  schemaReady = getPool().query(`
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

  return schemaReady;
}
