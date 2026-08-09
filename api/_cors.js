// Frontend and API are served from the same Vercel domain, so CORS isn't strictly
// required, but we set it defensively (e.g. for local dev against a deployed API)
// and to correctly handle preflight OPTIONS requests.
export function applyCors(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }

  return false;
}
