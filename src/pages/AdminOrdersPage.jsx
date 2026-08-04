import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../lib/api";

const statusOptions = ["Pending", "Packed", "Shipped"];

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

function normalizePhoneNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

function buildUpdateMessage(order, customNote) {
  const customerName = order.customer?.name || "there";
  const baseMessage = statusMessages[order.status] || "Your order is being processed.";
  const note = customNote?.trim();

  return [
    `Hi ${customerName},`,
    `Your RoastedKart order update is here.`,
    `Order ID: ${order.orderId}`,
    `Status: ${order.status}`,
    `Amount: ${formatCurrency(order.amount, order.currency)}`,
    "",
    baseMessage,
    note ? `Note from our team: ${note}` : "",
    "",
    "Thank you for ordering with RoastedKart.",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [messageDrafts, setMessageDrafts] = useState({});
  const [actionFeedback, setActionFeedback] = useState({});

  const loadOrders = async () => {
    setLoading(true);

    try {
      const data = await apiRequest("/api/orders", {}, "Unable to load orders.");
      setOrders(data.orders || []);
      setError("");
    } catch (caughtError) {
      setError(caughtError.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const clearOrders = async () => {
    const shouldClear = window.confirm("Clear all saved orders from the admin dashboard?");

    if (!shouldClear) {
      return;
    }

    try {
      await apiRequest("/api/orders", { method: "DELETE" }, "Unable to clear orders.");
      setOrders([]);
      setActionFeedback({});
      setError("");
    } catch (caughtError) {
      setError(caughtError.message || "Unable to clear orders.");
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const payload = await apiRequest(
        `/api/orders/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
        "Unable to update order status.",
      );

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: payload.order.status, updatedAt: payload.order.updatedAt } : order)),
      );
      setActionFeedback((prev) => ({ ...prev, [id]: "Status saved." }));
      setError("");
    } catch (caughtError) {
      setError(caughtError.message || "Unable to update order status.");
    }
  };

  const setMessageDraft = (orderId, value) => {
    setMessageDrafts((prev) => ({ ...prev, [orderId]: value }));
  };

  const shareUpdate = async (order, channel) => {
    const message = buildUpdateMessage(order, messageDrafts[order.id]);
    const email = order.customer?.email || "";
    const phone = normalizePhoneNumber(order.customer?.phone);

    try {
      if (channel === "copy") {
        if (!navigator.clipboard) {
          throw new Error("Clipboard access is not available in this browser.");
        }

        await navigator.clipboard.writeText(message);
        setActionFeedback((prev) => ({ ...prev, [order.id]: "Update copied to clipboard." }));
        return;
      }

      if (channel === "whatsapp") {
        if (!phone) {
          throw new Error("Customer phone number is missing.");
        }

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
        setActionFeedback((prev) => ({ ...prev, [order.id]: "WhatsApp update opened." }));
        return;
      }

      if (channel === "email") {
        if (!email) {
          throw new Error("Customer email is missing.");
        }

        window.location.href = `mailto:${email}?subject=${encodeURIComponent(`RoastedKart order update: ${order.orderId}`)}&body=${encodeURIComponent(message)}`;
        setActionFeedback((prev) => ({ ...prev, [order.id]: "Email draft opened." }));
      }
    } catch (caughtError) {
      setActionFeedback((prev) => ({ ...prev, [order.id]: caughtError.message || "Unable to share the update." }));
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const summary = useMemo(() => {
    return orders.reduce(
      (totals, order) => {
        totals.total += 1;
        totals[order.status] += 1;
        return totals;
      },
      { total: 0, Pending: 0, Packed: 0, Shipped: 0 },
    );
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchBlob = [
        order.orderId,
        order.paymentId,
        order.status,
        order.customer?.name,
        order.customer?.phone,
        order.customer?.email,
        order.customer?.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchBlob.includes(normalizedQuery);
    });
  }, [orders, query, statusFilter]);

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-[#00000012] bg-white p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffca3a]">Admin</p>
          <h1 className="mt-2 text-5xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Order operations</h1>
          <p className="mt-2 max-w-3xl text-[#555]">
            Manage paid orders, update fulfillment status, and share customer updates from one dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={loadOrders}
              className="rounded-full border border-[#00000015] bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:border-[#ff6b00]"
            >
              Refresh orders
            </button>
            <button
              onClick={clearOrders}
              className="rounded-full bg-[#1f1f1f] px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ff6b00]"
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-[#00000012] bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Total orders</p>
            <p className="mt-3 text-4xl font-black text-[#1f1f1f]">{summary.total}</p>
          </div>
          <div className="rounded-3xl border border-[#ffe3cb] bg-[#fff8f1] p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a5672a]">Pending</p>
            <p className="mt-3 text-4xl font-black text-[#8a4b00]">{summary.Pending}</p>
          </div>
          <div className="rounded-3xl border border-[#ffe8b9] bg-[#fffbed] p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b6a00]">Packed</p>
            <p className="mt-3 text-4xl font-black text-[#7a5900]">{summary.Packed}</p>
          </div>
          <div className="rounded-3xl border border-[#d9eedc] bg-[#f3fbf5] p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#3c7a53]">Shipped</p>
            <p className="mt-3 text-4xl font-black text-[#22613a]">{summary.Shipped}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#00000012] bg-white p-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <label className="block text-sm text-[#444]">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Search orders</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by order ID, customer, phone, email"
                className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
              />
            </label>
            <label className="block text-sm text-[#444]">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Status filter</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm font-black text-[#1f1f1f] outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
              >
                <option value="All">All statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-[#fff8ef] px-5 py-4 text-sm text-[#555]">
            <p>
              Showing <span className="font-black text-[#1f1f1f]">{filteredOrders.length}</span> of{" "}
              <span className="font-black text-[#1f1f1f]">{orders.length}</span> saved orders
            </p>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a56b30]">
              Route: /admin/orders
            </p>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-[#f4b3a7] bg-[#fff0ed] px-4 py-3 text-sm text-[#922d1d]">{error}</div>
          )}

          {loading ? (
            <p className="mt-6 text-sm text-[#555]">Loading orders...</p>
          ) : filteredOrders.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-[#00000012] bg-[#fffaf2] p-6 text-sm text-[#555]">
              No orders match the current search or filter.
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {filteredOrders.map((order) => {
                const updatePreview = buildUpdateMessage(order, messageDrafts[order.id]);
                const whatsappReady = Boolean(normalizePhoneNumber(order.customer?.phone));
                const emailReady = Boolean(order.customer?.email);

                return (
                  <article key={order.id} className="rounded-[2rem] border border-[#00000012] bg-[#fffaf4] p-6">
                    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Order ID</p>
                            <h2 className="mt-2 text-2xl font-black text-[#1f1f1f]">{order.orderId}</h2>
                            <p className="mt-2 text-sm text-[#666]">Payment ID: {order.paymentId || "Not available"}</p>
                          </div>
                          <span
                            className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${statusStyles[order.status] || "border-[#ddd] bg-white text-[#444]"}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                          <div className="rounded-3xl bg-white p-4">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Customer</p>
                            <p className="mt-2 text-lg font-black text-[#1f1f1f]">{order.customer?.name || "Not available"}</p>
                            <p className="mt-2 text-sm text-[#555]">Phone: {order.customer?.phone || "Not available"}</p>
                            <p className="mt-1 text-sm text-[#555]">Email: {order.customer?.email || "Not available"}</p>
                          </div>
                          <div className="rounded-3xl bg-white p-4">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Order value</p>
                            <p className="mt-2 text-lg font-black text-[#1f1f1f]">{formatCurrency(order.amount, order.currency)}</p>
                            <p className="mt-2 text-sm text-[#555]">Created: {formatDateTime(order.createdAt)}</p>
                            <p className="mt-1 text-sm text-[#555]">Last updated: {formatDateTime(order.updatedAt || order.createdAt)}</p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-3xl bg-white p-4 text-sm text-[#555]">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Delivery details</p>
                          <p className="mt-3"><span className="font-black text-[#1f1f1f]">Address:</span> {order.customer?.address || "Not available"}</p>
                          <p className="mt-2"><span className="font-black text-[#1f1f1f]">Notes:</span> {order.customer?.notes || "None"}</p>
                        </div>

                        <div className="mt-4 rounded-3xl bg-white p-4">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Fulfillment status</p>
                          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <select
                              value={order.status}
                              onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                              className="w-full rounded-2xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm font-black text-[#1f1f1f] outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40 sm:max-w-xs"
                            >
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            <p className="text-sm text-[#666]">
                              Customer-facing update: <span className="font-black text-[#1f1f1f]">{statusMessages[order.status]}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.75rem] border border-[#ffe5d0] bg-white p-5 shadow-sm">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff7a00]">Share update</p>
                        <p className="mt-3 text-sm leading-6 text-[#555]">
                          Add an optional note, preview the message, and send it to the customer over WhatsApp or email.
                        </p>

                        <label className="mt-4 block text-sm text-[#444]">
                          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Extra note</span>
                          <textarea
                            rows="4"
                            value={messageDrafts[order.id] || ""}
                            onChange={(event) => setMessageDraft(order.id, event.target.value)}
                            placeholder="Example: Dispatch expected by tomorrow evening."
                            className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
                          />
                        </label>

                        <div className="mt-4 rounded-3xl bg-[#fff8ef] p-4 text-sm text-[#5b4a37]">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a56b30]">Message preview</p>
                          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-[#5b4a37]">{updatePreview}</pre>
                        </div>

                        <div className="mt-4 grid gap-3">
                          <button
                            onClick={() => shareUpdate(order, "whatsapp")}
                            disabled={!whatsappReady}
                            className="inline-flex items-center justify-center rounded-full bg-[#25d366] px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            WhatsApp customer
                          </button>
                          <button
                            onClick={() => shareUpdate(order, "email")}
                            disabled={!emailReady}
                            className="inline-flex items-center justify-center rounded-full border border-[#00000015] bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:border-[#ff6b00] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Email update
                          </button>
                          <button
                            onClick={() => shareUpdate(order, "copy")}
                            className="inline-flex items-center justify-center rounded-full border border-[#00000015] bg-[#fff8ef] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:border-[#ff6b00]"
                          >
                            Copy update
                          </button>
                        </div>

                        <div className="mt-4 rounded-2xl border border-[#f3e2cf] bg-[#fffaf5] px-4 py-3 text-sm text-[#6b4a22]">
                          <p><span className="font-black text-[#1f1f1f]">Phone:</span> {order.customer?.phone || "Missing"}</p>
                          <p className="mt-1"><span className="font-black text-[#1f1f1f]">Email:</span> {order.customer?.email || "Missing"}</p>
                        </div>

                        {actionFeedback[order.id] && (
                          <div className="mt-4 rounded-2xl border border-[#ffd8ba] bg-[#fff4eb] px-4 py-3 text-sm text-[#8a4b00]">
                            {actionFeedback[order.id]}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
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
