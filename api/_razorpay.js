export const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
export const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

export async function createRazorpayOrder({ amount, receipt }) {
  if (!razorpayKeyId || !razorpayKeySecret) {
    throw Object.assign(new Error("Missing Razorpay environment variables."), { statusCode: 500 });
  }

  const authToken = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
  let response;

  try {
    response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency: "INR", receipt }),
      signal: AbortSignal.timeout(15000),
    });
  } catch (error) {
    throw Object.assign(new Error("Unable to connect to Razorpay from the backend."), { statusCode: 502 });
  }

  const rawText = await response.text();
  let payload = {};

  try {
    payload = rawText ? JSON.parse(rawText) : {};
  } catch {
    payload = { message: rawText };
  }

  if (!response.ok) {
    const description = payload?.error?.description || payload?.error?.reason || payload?.message || "";
    const isAuthFailure = response.status === 401 || /authentication failed/i.test(description);
    const message = isAuthFailure
      ? "Razorpay authentication failed. Please confirm the configured keys are valid for the active account."
      : description || "Unable to create Razorpay order.";

    throw Object.assign(new Error(message), { statusCode: isAuthFailure ? 401 : response.status || 500 });
  }

  return payload;
}
