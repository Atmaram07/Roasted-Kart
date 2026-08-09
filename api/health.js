import { applyCors } from "./_cors.js";

export default function handler(req, res) {
  if (applyCors(req, res)) return;

  return res.status(200).json({
    ok: true,
    service: "roastedkart-checkout",
    timestamp: new Date().toISOString(),
  });
}
