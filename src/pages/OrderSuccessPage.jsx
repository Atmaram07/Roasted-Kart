import { Link, useLocation } from "react-router-dom";

export default function OrderSuccessPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get("order_id") || "—";
  const paymentId = query.get("payment_id") || "—";
  const amount = query.get("amount") || "0";
  const currency = query.get("currency") || "INR";
  const readableAmount = Number(amount) > 0 ? `${currency} ${Number(amount) / 100}` : "Not available";

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#00000012] bg-white p-10 text-center shadow-[0_14px_32px_rgba(22,22,22,0.06)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffca3a]">Payment complete</p>
        <h1 className="mt-3 text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Order confirmed</h1>
        <p className="mt-3 text-[#555]">Your Razorpay checkout was verified successfully and the order has been recorded for fulfillment.</p>

        <div className="mt-8 grid gap-3 rounded-3xl bg-[#fffaf2] p-5 text-left text-sm text-[#555] sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Order ID</p>
            <p className="mt-2 font-black text-[#1f1f1f]">{orderId}</p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Payment ID</p>
            <p className="mt-2 font-black text-[#1f1f1f]">{paymentId}</p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Amount</p>
            <p className="mt-2 font-black text-[#1f1f1f]">{readableAmount}</p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Status</p>
            <p className="mt-2 font-black text-[#ff6b00]">Verified</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-full bg-[#1f1f1f] px-8 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ff6b00]"
          >
            Continue shopping
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center justify-center rounded-full border border-[#00000015] bg-white px-8 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:border-[#ff6b00]"
          >
            View cart
          </Link>
        </div>
      </div>
    </section>
  );
}
