import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiRequest } from "../lib/api";

const statusStyles = {
  Pending: "border-[#ffe2bf] bg-[#fff3e4] text-[#8a4b00]",
  Packed: "border-[#ffe8b1] bg-[#fff8de] text-[#7a5900]",
  Shipped: "border-[#cfe7d3] bg-[#edf9ef] text-[#22613a]",
};

const statusMessages = {
  Pending: "We have received your order and our team is preparing it for packing.",
  Packed: "Your order has been packed and is queued for dispatch.",
  Shipped: "Your order has been shipped and is on the way.",
};

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount || 0) / 100);
}

function formatDateTime(value) {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function TrackOrderPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [form, setForm] = useState({
    orderId: query.get("order_id") || "",
    phone: "",
  });
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = await apiRequest(
        "/api/orders/track",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: form.orderId.trim(),
            phone: form.phone.trim(),
          }),
        },
        "Unable to track this order right now.",
      );

      setOrder(payload.order || null);
    } catch (caughtError) {
      setOrder(null);
      setError(caughtError.message || "Unable to track this order right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen overflow-hidden bg-[#fff8ef] px-4 py-14 md:px-8">
      <div className="pointer-events-none absolute left-[-6rem] top-28 h-64 w-64 rounded-full bg-[#ff7a00]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-5rem] top-48 h-72 w-72 rounded-full bg-[#a7f34d]/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[2.25rem] border border-[#00000010] bg-[#1a1a1a] p-8 text-white shadow-[0_20px_60px_rgba(26,26,26,0.12)] md:p-10"
          >
            <p className="inline-flex rounded-full bg-[#ff7a00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white">
              Order Tracking
            </p>
            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] [font-family:'Space_Grotesk',sans-serif] md:text-5xl">
              Check your
              <br />
              snack status.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#d8d8d8]">
              Enter your order ID and the phone number used at checkout to see the latest fulfilment status for your RoastedKart order.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                "Use the exact order ID from your payment confirmation page.",
                "Track whether your order is pending, packed, or shipped.",
                "Reach support quickly if you need a manual update.",
              ].map((item, index) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ffb266]">Step {index + 1}</p>
                  <p className="mt-3 text-sm leading-6 text-[#efefef]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb266]">Need help instead?</p>
              <p className="mt-3 text-sm leading-7 text-[#d8d8d8]">
                If you do not have your order ID handy, contact our team on WhatsApp and we will help you locate the order.
              </p>
              <a
                href="https://wa.me/917425049203?text=Hi%2C%20I%20need%20help%20tracking%20my%20RoastedKart%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#25d366] px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:brightness-105"
              >
                WhatsApp Support
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-[2.25rem] border border-[#00000010] bg-white p-8 shadow-[0_20px_60px_rgba(26,26,26,0.08)] md:p-10"
          >
            <div className="max-w-xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff7a00]">Track your order</p>
              <h2 className="mt-3 text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">
                Find your latest update
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="orderId" className="text-xs font-black uppercase tracking-[0.16em] text-[#777]">
                  Order ID
                </label>
                <input
                  id="orderId"
                  name="orderId"
                  value={form.orderId}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Razorpay order ID"
                  className="mt-2 w-full rounded-[1.5rem] border border-[#00000014] bg-[#fdf9f2] px-5 py-4 text-sm text-[#1f1f1f] outline-none transition focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/30"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-xs font-black uppercase tracking-[0.16em] text-[#777]">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter the phone number used at checkout"
                  className="mt-2 w-full rounded-[1.5rem] border border-[#00000014] bg-[#fdf9f2] px-5 py-4 text-sm text-[#1f1f1f] outline-none transition focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-[#1f1f1f] px-7 py-3.5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#ff6b00] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Checking..." : "Track Order"}
              </button>
            </form>

            {error && (
              <div className="mt-6 rounded-[1.5rem] border border-[#ffd3bf] bg-[#fff3eb] p-4 text-sm text-[#8a3d00]">
                {error}
              </div>
            )}

            {order && (
              <div className="mt-8 space-y-5">
                <div className="rounded-[2rem] border border-[#00000010] bg-[#fff8ef] p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Current status</p>
                      <h3 className="mt-2 text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">
                        {order.status}
                      </h3>
                    </div>
                    <span className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${statusStyles[order.status] || "border-[#ddd] bg-white text-[#444]"}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#555]">
                    {statusMessages[order.status] || "Your order is being processed."}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-[#00000010] bg-white p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#999]">Order ID</p>
                    <p className="mt-3 break-all font-black text-[#1f1f1f]">{order.orderId}</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-[#00000010] bg-white p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#999]">Amount</p>
                    <p className="mt-3 font-black text-[#1f1f1f]">{formatCurrency(order.amount, order.currency)}</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-[#00000010] bg-white p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#999]">Placed at</p>
                    <p className="mt-3 text-sm font-semibold text-[#444]">{formatDateTime(order.createdAt)}</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-[#00000010] bg-white p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#999]">Last updated</p>
                    <p className="mt-3 text-sm font-semibold text-[#444]">{formatDateTime(order.updatedAt)}</p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-[#00000010] bg-white p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#999]">Customer</p>
                  <p className="mt-3 text-base font-black text-[#1f1f1f]">{order.customer?.name || "RoastedKart customer"}</p>
                  <p className="mt-1 text-sm text-[#555]">{order.customer?.address || "Address not available"}</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-[#1f1f1f] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#ff6b00]"
              >
                Continue Shopping
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#00000014] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#1f1f1f] transition hover:border-[#ff6b00] hover:text-[#ff6b00]"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
