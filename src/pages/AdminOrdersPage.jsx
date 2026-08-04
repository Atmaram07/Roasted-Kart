import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load orders.");
      }

      setOrders(data.orders || []);
      setError("");
    } catch (caughtError) {
      setError(caughtError.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const clearOrders = async () => {
    try {
      const response = await fetch("/api/orders", { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to clear orders.");
      }

      setOrders([]);
      setError("");
    } catch (caughtError) {
      setError(caughtError.message || "Unable to clear orders.");
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const contentType = response.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const message = typeof payload === "string" ? payload : payload.message || "Unable to update order status.";
        throw new Error(message);
      }

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: payload.order.status } : order)),
      );
      setError("");
    } catch (caughtError) {
      setError(caughtError.message || "Unable to update order status.");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-[#00000012] bg-white p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffca3a]">Admin</p>
          <h1 className="mt-2 text-5xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Manage orders</h1>
          <p className="mt-2 text-[#555]">Review verified Razorpay orders and clear the stored in-memory list when needed.</p>
        </div>

        <div className="rounded-[2rem] border border-[#00000012] bg-white p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff7a00]">Orders stored</p>
              <p className="text-2xl font-black text-[#1f1f1f]">{orders.length}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadOrders}
                className="rounded-full border border-[#00000015] bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:border-[#ff6b00]"
              >
                Refresh
              </button>
              <button
                onClick={clearOrders}
                className="rounded-full bg-[#1f1f1f] px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ff6b00]"
              >
                Clear all
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-[#f4b3a7] bg-[#fff0ed] px-4 py-3 text-sm text-[#922d1d]">{error}</div>
          )}

          {loading ? (
            <p className="text-sm text-[#555]">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl border border-[#00000012] bg-[#fffaf2] p-6 text-sm text-[#555]">
              No verified orders are currently stored in memory.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <article key={order.id} className="rounded-3xl border border-[#00000012] bg-[#fffaf2] p-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Order ID</p>
                      <p className="mt-2 font-black text-[#1f1f1f]">{order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Payment ID</p>
                      <p className="mt-2 font-black text-[#1f1f1f]">{order.paymentId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Amount</p>
                      <p className="mt-2 font-black text-[#1f1f1f]">{order.amount / 100} {order.currency}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Status</p>
                      <select
                        value={order.status}
                        onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-[#00000012] bg-white px-4 py-3 text-sm font-black text-[#1f1f1f] outline-none focus:border-[#ff7a00]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Customer</p>
                      <p className="mt-2 font-black text-[#1f1f1f]">{order.customer?.name || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Created</p>
                      <p className="mt-2 font-black text-[#1f1f1f]">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-[#555]">
                    <p><span className="font-black text-[#1f1f1f]">Phone:</span> {order.customer?.phone || "—"}</p>
                    <p><span className="font-black text-[#1f1f1f]">Email:</span> {order.customer?.email || "—"}</p>
                    <p><span className="font-black text-[#1f1f1f]">Address:</span> {order.customer?.address || "—"}</p>
                    <p><span className="font-black text-[#1f1f1f]">Notes:</span> {order.customer?.notes || "—"}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center rounded-full border border-[#00000015] bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:border-[#ff6b00]"
            >
              Back to checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
