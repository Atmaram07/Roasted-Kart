import { applyCors } from "./_cors.js";
import { createRazorpayOrder, razorpayKeyId } from "./_razorpay.js";

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const amount = Number(req.body?.amount);
  const receipt = String(req.body?.receipt || `order_${Date.now()}`);

  if (!Number.isFinite(amount) || amount < 100) {
    return res.status(400).json({ message: "Amount must be at least 100 paise." });
  }

  try {
    const order = await createRazorpayOrder({ amount, receipt });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: razorpayKeyId,
    });
  } catch (error) {
    const message = error?.message || "Unable to create Razorpay order.";
    const statusCode = Number(error?.statusCode) || 500;
    return res.status(statusCode).json({ message });
  }
}
