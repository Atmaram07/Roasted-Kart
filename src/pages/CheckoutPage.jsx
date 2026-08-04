import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { usePaymentStatus } from "../context/PaymentStatusContext";

const fallbackRazorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { setStatus } = usePaymentStatus();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", pincode: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  const orderLines = items
    .map((item) => `${item.qty} x ${item.name} (${item.weight}) - Rs ${item.price * item.qty}`)
    .join("\n");

  const orderMessage = encodeURIComponent(
    `Hi RoastedKart, I want to place a website order:\n${orderLines}\n\nSubtotal: Rs ${subtotal}\nShipping: Rs ${shipping === 0 ? "Free" : shipping}\nTotal: Rs ${total}\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress: ${form.address}, ${form.city} - ${form.pincode}\nNotes: ${form.notes}`,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleCheckout = async () => {
    if (!window.Razorpay) {
      setPaymentError("Razorpay checkout script is still loading. Please try again in a moment.");
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError("");

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          receipt: `roastedkart_${Date.now()}`,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.message || "Unable to create Razorpay order. Please verify the backend credentials and try again.",
        );
      }

      const razorpayKeyId = orderData.key_id || fallbackRazorpayKeyId;

      if (!razorpayKeyId) {
        throw new Error("Razorpay public key is missing from the server configuration.");
      }

      setStatus({
        paymentState: "creating",
        orderId: orderData.order_id,
        paymentId: "",
        amount: orderData.amount,
        currency: orderData.currency,
        message: "Razorpay order created. Complete the payment modal to finish checkout.",
      });

      const options = {
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RoastedKart",
        description: "Snack box checkout",
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.message || "Payment could not be verified.");
            }

            const recordedOrder = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount: orderData.amount,
                currency: orderData.currency,
                signature: response.razorpay_signature,
                customer: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  address: `${form.address}, ${form.city} - ${form.pincode}`,
                  notes: form.notes,
                },
              }),
            });

            const recordedOrderData = await recordedOrder.json();
            if (!recordedOrder.ok) {
              throw new Error(recordedOrderData.message || "Order record could not be saved.");
            }

            setStatus({
              paymentState: "paid",
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              amount: orderData.amount,
              currency: orderData.currency,
              message: "Payment verified and order record saved.",
            });
            clearCart();
            navigate(`/order-success?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}&amount=${orderData.amount}&currency=${orderData.currency}`);
            setPaymentError("");
          } catch (error) {
            setStatus({
              paymentState: "failed",
              orderId: orderData.order_id,
              paymentId: "",
              amount: orderData.amount,
              currency: orderData.currency,
              message: error.message || "Payment verification failed.",
            });
            setPaymentError(error.message || "Payment verification failed.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email || "",
          contact: form.phone,
        },
        notes: {
          address: `${form.address}, ${form.city} - ${form.pincode}`,
          notes: form.notes,
        },
        theme: {
          color: "#ff7a00",
        },
        modal: {
          ondismiss: function () {
            setPaymentError("Payment cancelled. Your order is still saved in the cart.");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        setStatus({
          paymentState: "failed",
          orderId: orderData.order_id,
          paymentId: "",
          amount: orderData.amount,
          currency: orderData.currency,
          message: response.error.description || "Payment failed. Please try again.",
        });
        setPaymentError(response.error.description || "Payment failed. Please try again.");
      });
      razorpayInstance.open();
    } catch (error) {
      setPaymentError(error.message || "Unable to start the payment flow.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/917425049203?text=${orderMessage}`, "_blank");
    clearCart();
    navigate("/shop");
  };

  if (items.length === 0) {
    return (
      <section className="px-4 py-14 md:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#00000012] bg-white p-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffca3a]">Checkout</p>
          <h1 className="mt-3 text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Your cart is empty</h1>
          <p className="mt-3 text-[#555]">Add your favourite snack box first, then return here to complete the order.</p>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-[#1f1f1f] px-8 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ff6b00]"
          >
            Browse shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-3xl border border-[#00000012] bg-white p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffca3a]">Checkout</p>
          <h1 className="mt-2 text-5xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Website Order</h1>
          <p className="mt-2 text-[#555]">Complete your details and use WhatsApp to confirm your order while web payments are being rolled out.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr]">
          <div className="rounded-[2rem] border border-[#00000012] bg-white p-8">
            <h2 className="text-2xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Shipping details</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-[#444]">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm text-[#444]">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Phone</span>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
                    placeholder="Mobile number"
                  />
                </label>
              </div>

              <label className="block text-sm text-[#444]">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block text-sm text-[#444]">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Address</span>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
                  placeholder="Street, building, landmark"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block text-sm text-[#444]">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">City</span>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
                    placeholder="City"
                  />
                </label>
                <label className="block text-sm text-[#444]">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Pincode</span>
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
                    placeholder="PIN code"
                  />
                </label>
                <label className="block text-sm text-[#444]">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#999]">Notes</span>
                  <input
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-[#00000012] bg-[#fdf9f2] px-4 py-3 text-sm outline-none focus:border-[#ff7a00] focus:ring-2 focus:ring-[#ffbe80]/40"
                    placeholder="Any delivery instructions?"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#1f1f1f] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ff6b00] sm:w-auto"
                >
                  Review Order
                </button>
                <Link
                  to="/cart"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#00000015] bg-[#fff] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:border-[#ff6b00] sm:w-auto"
                >
                  Back to cart
                </Link>
              </div>
            </form>

            {submitted && (
              <div className="mt-8 rounded-3xl border border-[#ffcc99] bg-[#fff7ed] p-6 text-[#6b3b00] shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff7a00]">Website checkout ready</p>
                <p className="mt-3 text-base leading-relaxed">
                  Your details are set. You can now complete checkout with Razorpay for a secure card or UPI payment, or fall back to WhatsApp for manual confirmation.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={handleCheckout}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff3d81] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? "Processing..." : "Pay with Razorpay"}
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="inline-flex items-center justify-center rounded-full border border-[#00000015] bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:border-[#ff6b00]"
                  >
                    Confirm on WhatsApp
                  </button>
                </div>
                {paymentError && (
                  <p className="mt-4 rounded-2xl border border-[#f4b3a7] bg-[#fff0ed] px-4 py-3 text-sm text-[#922d1d]">{paymentError}</p>
                )}
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] border border-[#00000012] bg-white p-8">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffca3a]">Order summary</p>
                <h2 className="mt-2 text-3xl font-black uppercase [font-family:'Space_Grotesk',sans-serif] text-[#1f1f1f]">{items.length} item{items.length !== 1 ? "s" : ""}</h2>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="rounded-3xl bg-[#fff7f0] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.12em] text-[#777]">{item.productCategory}</p>
                        <p className="mt-2 text-lg font-black uppercase text-[#1f1f1f]">{item.name}</p>
                        <p className="mt-1 text-sm text-[#555]">{item.qty} × {item.weight}</p>
                      </div>
                      <p className="text-right text-lg font-black text-[#ff6b00]">Rs {item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-[#f5f5f5] p-5 text-sm text-[#555]">
                <div className="flex justify-between py-2"><span>Subtotal</span><span>Rs {subtotal}</span></div>
                <div className="flex justify-between py-2"><span>Shipping</span><span>{shipping === 0 ? "Free" : `Rs ${shipping}`}</span></div>
                <div className="mt-4 flex justify-between border-t border-[#ddd] pt-4 text-lg font-black text-[#1f1f1f]"><span>Total</span><span>Rs {total}</span></div>
              </div>

              <div className="rounded-3xl border border-[#00000012] bg-[#fffaf2] p-5 text-sm text-[#555]">
                <p className="font-black uppercase tracking-[0.18em] text-[#ff7a00]">Payment status</p>
                <p className="mt-3 leading-relaxed">
                  Pay securely with Razorpay using the Standard Checkout modal. The order is created server-side and verified with the signature sent back from Razorpay.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
