import crypto from "node:crypto";
import { applyCors } from "./_cors.js";
import { calculateCheckout } from "./_pricing.js";
import { createRazorpayOrder, razorpayKeyId } from "./_razorpay.js";

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  let checkout;
  try {
    checkout = calculateCheckout(req.body?.items, req.body?.bundles);
  } catch (error) {
    return res.status(Number(error?.statusCode) || 400).json({ message: error.message });
  }

  try {
    // The receipt and amount are generated on the server; browser-supplied totals are ignored.
    const receipt = `rk_${crypto.randomUUID().replace(/-/g, "").slice(0, 24)}`;
    const order = await createRazorpayOrder({ amount: checkout.amountPaise, receipt });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: razorpayKeyId,
      subtotal: checkout.subtotalRupees,
      shipping: checkout.shippingRupees,
      total: checkout.totalRupees,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    const statusCode = Number(error?.statusCode) || 500;
    return res.status(statusCode).json({
      message: statusCode === 401
        ? "Payment service authentication failed. Please contact support."
        : "Unable to start checkout right now. Please try again.",
    });
  }
}
