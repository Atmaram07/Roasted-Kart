import { applyCors } from "./_cors.js";
import { razorpayKeyId, razorpayKeySecret } from "./_razorpay.js";

export default function handler(req, res) {
  if (applyCors(req, res)) return;

  return res.status(200).json({
    paymentEnabled: Boolean(razorpayKeyId && razorpayKeySecret),
    key_id: razorpayKeyId,
    manualCheckoutEnabled: true,
    supportPhone: "917425049203",
  });
}
