export const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
export const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

function requireCredentials() {
  if (!razorpayKeyId || !razorpayKeySecret) {
    throw Object.assign(new Error("Missing Razorpay environment variables."), { statusCode: 500 });
  }
}

async function razorpayRequest(path, options = {}) {
  requireCredentials();
  const authToken = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
  let response;

  try {
    response = await fetch(`https://api.razorpay.com/v1/${path}`, {
      ...options,
      headers: {
        Authorization: `Basic ${authToken}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw Object.assign(new Error("Unable to connect to Razorpay from the backend."), { statusCode: 502 });
  }

  const rawText = await response.text();
  let payload = {};
  try {
    payload = rawText ? JSON.parse(rawText) : {};
  } catch {
    payload = {};
  }

  if (!response.ok) {
    const description = payload?.error?.description || payload?.error?.reason || "";
    const isAuthFailure = response.status === 401 || /authentication failed/i.test(description);
    throw Object.assign(
      new Error(isAuthFailure
        ? "Razorpay authentication failed. Please confirm the configured keys are valid."
        : description || "Razorpay could not verify this payment."),
      { statusCode: isAuthFailure ? 401 : response.status || 502 },
    );
  }

  return payload;
}

export async function createRazorpayOrder({ amount, receipt }) {
  if (!Number.isSafeInteger(amount) || amount < 100) {
    throw Object.assign(new Error("Invalid server-calculated payment amount."), { statusCode: 400 });
  }

  return razorpayRequest("orders", {
    method: "POST",
    body: JSON.stringify({ amount, currency: "INR", receipt }),
  });
}

export async function fetchRazorpayOrder(orderId) {
  return razorpayRequest(`orders/${encodeURIComponent(orderId)}`);
}

export async function fetchRazorpayPayment(paymentId) {
  return razorpayRequest(`payments/${encodeURIComponent(paymentId)}`);
}
