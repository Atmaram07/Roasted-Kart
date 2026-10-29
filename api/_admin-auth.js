import crypto from "node:crypto";

export function requireAdmin(req, res) {
  const configuredToken = process.env.ADMIN_API_TOKEN;

  if (!configuredToken) {
    res.status(503).json({ message: "Order administration is not configured. Set ADMIN_API_TOKEN in the server environment." });
    return false;
  }

  const authorization = String(req.headers?.authorization || "");
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  const suppliedToken = match?.[1] || "";

  const expected = Buffer.from(configuredToken);
  const supplied = Buffer.from(suppliedToken);

  const valid =
    expected.length === supplied.length &&
    expected.length > 0 &&
    crypto.timingSafeEqual(expected, supplied);

  if (!valid) {
    res.setHeader("WWW-Authenticate", "Bearer");
    res.status(401).json({ message: "Admin authorization required." });
    return false;
  }

  return true;
}
