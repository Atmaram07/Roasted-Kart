import crypto from "node:crypto";

export function createTrackingToken() {
  const token = crypto.randomBytes(32).toString("base64url");
  return { token, hash: crypto.createHash("sha256").update(token).digest("hex") };
}

export function hashTrackingToken(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

export async function sendOrderEmail({ to, subject, html, text }) {
  if (!to) return { sent: false, reason: "no-recipient" };
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    console.warn("Order email skipped: configure RESEND_API_KEY and EMAIL_FROM.");
    return { sent: false, reason: "email-not-configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html, text }),
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email provider returned ${response.status}: ${details.slice(0, 400)}`);
  }
  return { sent: true };
}

export function orderEmailMarkup({ customerName, orderId, amount, status, trackingUrl }) {
  const safe = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
  }[char]));
  return {
    subject: status === "Pending" ? `RoastedKart order confirmed · ${orderId}` : `RoastedKart order update · ${status}`,
    text: `Hi ${customerName}, your RoastedKart order ${orderId} is ${status}. Amount: ₹${(Number(amount) / 100).toFixed(2)}. Track your order: ${trackingUrl}`,
    html: `<div style="font-family:Arial,sans-serif;color:#222;max-width:600px;margin:auto"><h2 style="color:#f47700">RoastedKart</h2><p>Hi ${safe(customerName)},</p><h2>${status === "Pending" ? "Your order is confirmed!" : "Your order status has changed"}</h2><p>Order reference: <strong>${safe(orderId)}</strong></p><p>Status: <strong>${safe(status)}</strong></p><p>Amount paid: <strong>₹${(Number(amount) / 100).toFixed(2)}</strong></p><p><a href="${safe(trackingUrl)}" style="display:inline-block;background:#f47700;color:#fff;padding:12px 18px;border-radius:24px;text-decoration:none">Track your order</a></p><p style="color:#666;font-size:12px">This secure link provides access to the status of this order. Please do not share it publicly.</p></div>`,
  };
}
