import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { flattenedVariants } from "../data/catalog";

export default function BuildYourOwnBoxPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState(
    () => Object.fromEntries(flattenedVariants.map((variant) => [variant.id, 0])),
  );

  const selectedItems = useMemo(
    () => flattenedVariants.filter((variant) => quantities[variant.id] > 0),
    [quantities],
  );

  const selectedSlots = useMemo(
    () => flattenedVariants.flatMap((variant) => Array(quantities[variant.id]).fill(variant)),
    [quantities],
  );

  const remainingSlots = Math.max(0, 5 - selectedSlots.length);
  const canAddMore = selectedSlots.length < 5;

  const totalPrice = selectedItems.reduce(
    (sum, variant) => sum + variant.price * quantities[variant.id],
    0,
  );

  const updateQuantity = (id, value) => {
    setQuantities((prev) => {
      const totalSelected = Object.values(prev).reduce((sum, qty) => sum + qty, 0);
      const currentQty = prev[id];
      const nextQty = Math.max(0, Math.min(5, value));
      const delta = nextQty - currentQty;

      if (delta > 0 && totalSelected + delta > 5) {
        return prev;
      }

      return {
        ...prev,
        [id]: nextQty,
      };
    });
  };

  const handleAddToCart = () => {
    selectedItems.forEach((variant) => addToCart(variant, quantities[variant.id]));
    navigate("/cart");
  };

  return (
    <section className="bg-[#111111] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="rounded-[2rem] border border-[#ffffff14] bg-[#161616] p-8 md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full bg-[#ffffff10] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ffd26f]">
                Build your own box
              </p>
              <h1 className="text-5xl font-black uppercase leading-tight tracking-tight [font-family:'Space_Grotesk',sans-serif] sm:text-6xl">
                Pick any <span className="text-[#ffca3a]">5 packs</span> for <span className="text-[#ffca3a]">₹999</span>
              </h1>
              <p className="mt-5 text-base leading-8 text-[#c1c1c1] md:text-lg">
                Choose exactly 5 snack packs from our range and build a custom box for parties, gifting, or everyday munching.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#ffffff1a] bg-[#0f0f0f] p-6 text-sm text-[#d8d8d8]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffd26f]">Limited time offer</p>
              <p className="mt-3 text-2xl font-black text-white">₹999 / 5 packs</p>
              <p className="mt-2 text-sm text-[#adadad]">Complete your box in one go — no extra charges for mix and match.</p>
            </div>
          </div>
          <div className="mt-10 rounded-[2rem] border border-[#ffffff12] bg-[#111111] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffd26f]">Selected packs</p>
                <p className="mt-2 text-3xl font-black text-white">{selectedSlots.length}/5</p>
              </div>
              <span className="inline-flex rounded-full bg-[#ff6b00] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white">
                {remainingSlots} slots left
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`min-h-[88px] rounded-3xl border p-4 text-xs uppercase tracking-[0.16em] transition ${
                    selectedSlots[index] ? "border-[#ffb75f] bg-[#1b1b1b] text-white" : "border-[#333] bg-[#0f0f0f] text-[#777]"
                  }`}>
                  {selectedSlots[index]
                    ? selectedSlots[index].productName
                    : "Empty slot"}
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
          <div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {flattenedVariants.map((variant) => (
                <motion.article
                  key={variant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="overflow-hidden rounded-[2rem] border border-[#ffffff12] bg-[#161616] shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative h-52 bg-[#111111] p-4">
                    <img
                      src={variant.productImage}
                      alt={variant.productName}
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute right-4 top-4 rounded-full bg-[#000000b3] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#ffd26f]">
                      {variant.weight}
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9f43]">{variant.productCategory}</p>
                      <h2 className="mt-2 text-xl font-black uppercase text-white [font-family:'Space_Grotesk',sans-serif]">{variant.productName}</h2>
                      <p className="mt-2 text-sm text-[#a7a7a7]">{variant.tags.join(" • ")}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-2xl font-black text-[#ffca3a]">₹{variant.price}</p>
                        <p className="text-xs line-through text-[#5d5d5d]">₹{variant.mrp}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateQuantity(variant.id, quantities[variant.id] + 1)}
                        disabled={!canAddMore}
                        className="rounded-full bg-[#ff3a3a] px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#ff6b6b] disabled:cursor-not-allowed disabled:bg-[#555]"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#8c8c8c]">
                      <span>Selected</span>
                      <span>{quantities[variant.id]}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-[#ffffff12] bg-[#141414] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
            <div className="rounded-[1.75rem] bg-[#191919] p-6 text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffd26f]">Box summary</p>
              <p className="mt-3 text-4xl font-black text-white">{selectedSlots.length} / 5</p>
              <p className="mt-2 text-sm text-[#bcbcbc]">packs selected</p>
            </div>

            <div className="rounded-[1.75rem] bg-[#121212] p-5 text-sm text-[#d2d2d2]">
              <p className="font-black uppercase tracking-[0.18em] text-[#ffd26f]">Your selection</p>
              <div className="mt-4 space-y-3">
                {selectedSlots.length > 0 ? (
                  selectedSlots.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between rounded-3xl border border-[#ffffff10] bg-[#101010] px-4 py-3">
                      <span className="text-sm text-[#f5f5f5]">{item.productName}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}
                        className="rounded-full border border-[#ff6b00] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#ffca3a]"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#969696]">Select packs to preview them here.</p>
                )}
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-[#191919] p-6 text-sm text-[#d2d2d2]">
              <div className="flex items-center justify-between border-b border-[#ffffff10] pb-4 text-[#ffffff]">
                <span>Subtotal</span>
                <span className="font-black">₹{totalPrice}</span>
              </div>
              <div className="mt-4 space-y-2 text-[#bcbcbc]">
                <p className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>₹49</span>
                </p>
                <p className="flex items-center justify-between font-black text-white">
                  <span>Total</span>
                  <span>₹{totalPrice + 49}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={selectedSlots.length === 0}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#ff6b00] px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ff8b00] disabled:cursor-not-allowed disabled:bg-[#555]"
            >
              Add selection to cart
            </button>

            <Link
              to="/shop"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#ff6b00] bg-transparent px-6 py-4 text-sm font-black uppercase tracking-wide text-[#ffca3a] transition hover:bg-[#ff6b00]/10"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
