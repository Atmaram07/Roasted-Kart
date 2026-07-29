import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, count, subtotal, updateQty, removeFromCart, clearCart } = useCart();
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  const orderMessage = encodeURIComponent(
    `Hi RoastedKart, I'd like to place an order:\n` +
      items
        .map((item) => `- ${item.qty} x ${item.name} (${item.weight}) - Rs ${item.price * item.qty}`)
        .join("\n") +
      `\n\nSubtotal: Rs ${subtotal}` +
      `\nShipping: Rs ${shipping === 0 ? "Free" : shipping}` +
      `\nTotal: Rs ${total}` +
      `\n\nPlease let me know how to proceed.`
  );

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-[#00000012] bg-white p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffca3a]">Cart</p>
          <h1 className="mt-2 text-5xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Snack Stack</h1>
          <p className="mt-2 text-[#555]">{count} items in your cart.</p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-[#00000012] bg-white p-10 text-center">
            <p className="text-lg text-[#555]">Your cart is empty. Let&apos;s fix that.</p>
            <Link to="/shop" className="mt-5 inline-block rounded-full bg-[#ff7a00] px-6 py-3 text-sm font-black uppercase tracking-wide text-white">
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.38fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-[#00000012] bg-white p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {item.productImage && (
                        <img src={item.productImage} alt={item.name} className="h-20 w-20 rounded-3xl object-contain" />
                      )}
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#ffca3a]">{item.productCategory}</p>
                        <h3 className="text-2xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">{item.name}</h3>
                        <p className="text-sm text-[#555]">{item.weight}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-[#ff6b00]">Rs {item.price}</p>
                      <p className="text-xs text-[#b9aacd] line-through">Rs {item.mrp}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-8 w-8 rounded-full bg-[#fff8ef] text-[#1f1f1f]">-</button>
                      <span className="w-8 text-center font-black">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-8 w-8 rounded-full bg-[#fff8ef] text-[#1f1f1f]">+</button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#555]">Item total</p>
                      <p className="text-lg font-black text-[#1f1f1f]">Rs {item.price * item.qty}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full border border-[#ff3d81] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#ff8eb8]"
                    >
                      Remove
                    </button>
                  </div>
                </motion.article>
              ))}

              <button onClick={clearCart} className="rounded-full border border-[#0000001f] px-5 py-2 text-xs font-black uppercase tracking-wide text-[#555]">
                Clear Cart
              </button>
            </div>

            <aside className="h-fit rounded-2xl border border-[#00000012] bg-white p-5">
              <h2 className="text-2xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Summary</h2>
              <div className="mt-4 space-y-2 text-sm text-[#555]">
                <p className="flex justify-between"><span>Subtotal</span><span>Rs {subtotal}</span></p>
                <p className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : `Rs ${shipping}`}</span></p>
                <p className="flex justify-between text-lg font-black text-[#1f1f1f]"><span>Total</span><span>Rs {total}</span></p>
              </div>
              <Link
                to="/checkout"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#1f1f1f] px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ff6b00]"
              >
                Proceed to Checkout
              </Link>
              <a
                href={`https://wa.me/917425049203?text=${orderMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff3d81] px-5 py-3 text-sm font-black uppercase tracking-wide text-white"
              >
                Checkout via WhatsApp
              </a>
              <p className="mt-3 text-xs text-[#b9aacd]">Proceed to website checkout when payment is connected, or place your order on WhatsApp now.</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

