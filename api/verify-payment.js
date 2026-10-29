import crypto from "node:crypto";
import { applyCors } from "./_cors.js";
import {
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  razorpayKeySecret,
} from "./_razorpay.js";

function isValidSignature(orderId, paymentId, signature) {
  if (!razorpayKeySecret || !orderId || !paymentId || !signature) return false;
  const expected = crypto.createHmac("sha256", razorpayKeySecret)
    .update(`${orderId}|${paymentId}`).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(String(signature));
  return expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body ?? {};
  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ message: "Missing payment verification fields." });
  }

  if (!isValidSignature(String(orderId), String(paymentId), String(signature))) {
    return res.status(400).json({ message: "Payment signature mismatch." });
  }

  try {
    const [order, payment] = await Promise.all([
      fetchRazorpayOrder(String(orderId)),
      fetchRazorpayPayment(String(paymentId)),
    ]);

    if (payment.order_id !== order.id || order.id !== String(orderId)) {
      return res.status(400).json({ message: "Payment does not belong to this checkout order." });
    }

    if (order.currency !== "INR" || payment.currency !== order.currency ||
        Number(payment.amount) !== Number(order.amount)) {
      return res.status(400).json({ message: "The payment amount or currency does not match the checkout order." });
    }

    if (payment.status !== "captured") {
      return res.status(409).json({
        message: payment.status === "authorized"
          ? "Payment is authorized but not yet captured. Please contact support before retrying."
          : "Razorpay has not confirmed a captured payment for this order.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment signature, amount, currency, and capture status verified.",
      order_id: order.id,
      payment_id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
    });
  } catch (error) {
    console.error("Razorpay payment verification failed:", error);
    return res.status(Number(error?.statusCode) || 502).json({
      message: "Unable to confirm payment with Razorpay right now. Please do not retry payment until the status is checked.",
    });
  }
}
