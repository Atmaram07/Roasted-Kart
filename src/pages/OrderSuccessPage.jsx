import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const supportPhone = "917425049203";

function formatAmount(amount, currency) {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return "Not available";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 2,
  }).format(numericAmount / 100);
}

export default function OrderSuccessPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const orderId = query.get("order_id") || "Not available";
  const paymentId = query.get("payment_id") || "Not available";
  const amount = query.get("amount");
  const currency = query.get("currency") || "INR";
  const formattedAmount = formatAmount(amount, currency);
  const placedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const supportMessage = encodeURIComponent(
    `Hi RoastedKart, I need help with my order.\nOrder ID: ${orderId}\nPayment ID: ${paymentId}`,
  );

  return (
    <section className="min-h-screen overflow-hidden bg-[#fff8ef] px-4 py-14 md:px-8">
      <div className="pointer-events-none absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-[#ff7a00]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-[#d5ff4f]/18 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[2.5rem] border border-[#00000010] bg-white shadow-[0_20px_60px_rgba(26,26,26,0.08)]"
        >
          <div className="bg-[#1a1a1a] px-6 py-8 text-white md:px-10 md:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex rounded-full bg-[#ff7a00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white">
                  Order placed successfully
                </p>
                <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] [font-family:'Space_Grotesk',sans-serif] md:text-6xl">
                  Payment received.
                  <br />
                  Snack delivery unlocked.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#cfcfcf] md:text-base">
                  Your payment has been verified and your RoastedKart order is now in the fulfilment queue. We will start processing it right away.
                </p>
              </div>

              <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb266]">Order snapshot</p>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#9f9f9f]">Amount paid</p>
                    <p className="mt-2 text-2xl font-black text-white">{formattedAmount}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#9f9f9f]">Placed on</p>
                    <p className="mt-2 font-semibold text-white">{placedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-[#00000010] bg-[#fffaf4] p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9a6a3a]">Order ID</p>
                  <p className="mt-3 break-all text-base font-black text-[#1f1f1f]">{orderId}</p>
                </div>
                <div className="rounded-[1.75rem] border border-[#00000010] bg-[#fffaf4] p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9a6a3a]">Payment ID</p>
                  <p className="mt-3 break-all text-base font-black text-[#1f1f1f]">{paymentId}</p>
                </div>
                <div className="rounded-[1.75rem] border border-[#00000010] bg-[#fffaf4] p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9a6a3a]">Status</p>
                  <p className="mt-3 inline-flex rounded-full bg-[#dff7e6] px-3 py-1 text-sm font-black uppercase tracking-wide text-[#18794e]">
                    Verified
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-[#00000010] bg-[#fffaf4] p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#9a6a3a]">Next update</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#444]">
                    You will hear from us when packing and dispatch are underway.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-[#00000010] bg-[#1a1a1a] p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff9a47]">What happens next</p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    "Your payment is verified and linked to the order.",
                    "Our team prepares and packs your snacks for dispatch.",
                    "Delivery updates will follow once shipment moves out.",
                  ].map((step, index) => (
                    <div key={step} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ffb266]">Step {index + 1}</p>
                      <p className="mt-3 text-sm leading-6 text-[#efefef]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-[2rem] border border-[#00000010] bg-[#fff4e7] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff7a00]">Need anything else?</p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">
                  Your order is safe.
                  <br />
                  Support is one tap away.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#555]">
                  If you need help with this payment or want to confirm delivery details, you can reach RoastedKart directly with your order reference.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    to={`/track-order?order_id=${encodeURIComponent(orderId)}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#1f1f1f] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#ff6b00]"
                  >
                    Track This Order
                  </Link>
                  <a
                    href={`https://wa.me/${supportPhone}?text=${supportMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#25d366] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:brightness-105"
                  >
                    Contact on WhatsApp
                  </a>
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-full border border-[#00000014] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#1f1f1f] transition hover:border-[#ff6b00] hover:text-[#ff6b00]"
                  >
                    Continue shopping
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full border border-[#00000014] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#1f1f1f] transition hover:border-[#ff6b00] hover:text-[#ff6b00]"
                  >
                    Back to home
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#00000010] bg-white p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#888]">Helpful note</p>
                <p className="mt-3 text-sm leading-7 text-[#555]">
                  Save your order ID and payment ID for support requests. If you reached this page after a successful payment, your order has already been recorded.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
