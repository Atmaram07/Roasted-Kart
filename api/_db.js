import { Pool } from "pg";

// Reused across warm serverless invocations (Vercel keeps the process alive between
// requests for a short time), so we don't open a new pool on every request.
let pool;

function getPostgresConnectionConfig(connectionString) {
  // node-postgres replaces the explicit "ssl" object when SSL parameters such as
  // sslmode or sslrootcert are present in the connection string. Strip those
  // parameters so the supplied Supabase CA certificate is always used.
  const url = new URL(connectionString);
  for (const key of ["sslmode", "sslrootcert", "sslcert", "sslkey"]) {
    url.searchParams.delete(key);
  }

  const ca = process.env.POSTGRES_CA_CERT;
  if (!ca?.trim()) {
    throw new Error(
      "Missing POSTGRES_CA_CERT. Add the Supabase database root certificate as a Vercel environment variable.",
    );
  }

  return {
    connectionString: url.toString(),
    // Verify the database certificate chain and hostname. Never disable TLS
    // certificate verification for the production database connection.
    ssl: {
      ca: ca.trim(),
      rejectUnauthorized: true,
    },
    max: 5,
  };
}

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

    pool = new Pool(getPostgresConnectionConfig(connectionString));
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
