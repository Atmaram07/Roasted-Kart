import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/catalog";

export default function ShopPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => ["All", ...products.map((p) => p.category)], []);

  const visibleProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const categoryMatch = categoryFilter === "All" || p.category === categoryFilter;
      const searchMatch =
        !search ||
        [p.name, p.shortDescription, p.category].join(" ").toLowerCase().includes(search);
      return categoryMatch && searchMatch;
    });
  }, [categoryFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-[#fff8ef]">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-[#1a1a1a] px-4 py-16 md:px-8 md:py-20">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ff7a00]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#8b5cf6]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-[0.24em] text-[#ff7a00]"
          >
            The Snack Drop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-3 text-5xl font-black uppercase leading-tight text-white [font-family:'Space_Grotesk',sans-serif] md:text-6xl"
          >
            Snack Smart.
            <br />
            <span className="bg-gradient-to-r from-[#ff7a00] via-[#ff3d81] to-[#8b5cf6] bg-clip-text text-transparent">
              Snack Loud.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-base text-[#aaa]"
          >
            3 curated boxes — millets, protein pops, or the full trail pack with all 8 flavours. Pick your crunch.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-6 text-sm font-black uppercase"
          >
            {[
              { val: "3", label: "Box Options" },
              { val: "8", label: "Flavours" },
              { val: "100%", label: "Roasted" },
              { val: "0", label: "Palm Oil" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="text-2xl text-[#ff7a00]">{s.val}</span>
                <span className="text-[10px] tracking-[0.14em] text-[#666]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="sticky top-[72px] z-30 border-b border-[#00000010] bg-[#fff8ef]/95 px-4 py-3 backdrop-blur-md md:px-8">
        <div className="mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#888]">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search snacks, flavours, categories..."
              className="w-full min-w-[220px] rounded-full border border-[#00000015] bg-white px-4 py-2 text-sm text-[#444] outline-none transition focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ffbe80]/30"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wide transition ${
                    categoryFilter === cat
                      ? "bg-[#1f1f1f] text-white shadow-md"
                      : "border border-[#00000015] bg-white text-[#555] hover:border-[#ff6b00]/40 hover:text-[#ff6b00]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <AnimatePresence mode="popLayout">
          {visibleProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-[#aaa]"
            >
              No products found.
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {visibleProducts.map((product, idx) => {
                const variant = product.variants[0];

                return (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: idx * 0.07 }}
                    className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.13)]"
                  >
                    {/* Gradient top accent */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${product.heroColor}`} />



                    {/* Image area */}
                    <div className="relative flex items-center justify-center bg-[#fffaf5] px-8 pt-8 pb-4">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="h-52 w-full object-contain"
                        whileHover={{ scale: 1.05, y: -4 }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>

                    {/* Info area */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Category + tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#fff0e4] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#8b4b00]">
                          {product.category}
                        </span>
                        {product.websiteExclusive && (
                          <span className="rounded-full bg-[#1f1f1f] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#ffd26f]">
                            Website Exclusive
                          </span>
                        )}
                        {variant.tags.slice(0, 1).map((tag) => (
                          <span key={tag} className="rounded-full border border-[#00000010] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#999]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Name */}
                      <h2 className="mt-3 text-xl font-black uppercase leading-tight text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">
                        {product.name}
                      </h2>

                      {/* Description */}
                      <p className="mt-2 text-sm leading-relaxed text-[#777]">{product.shortDescription}</p>

                      {/* Macro highlights */}
                      <div className="mt-4 flex gap-2">
                        <div className="flex flex-1 flex-col items-center rounded-xl bg-[#fff0e4] py-2.5">
                          <span className="text-sm font-black text-[#ff6b00]">{variant.protein}</span>
                          <span className="text-[9px] font-black uppercase tracking-wide text-[#c47a3a]">Protein</span>
                        </div>
                        <div className="flex flex-1 flex-col items-center rounded-xl bg-[#f0f9ff] py-2.5">
                          <span className="text-sm font-black text-[#0284c7]">{variant.calories}</span>
                          <span className="text-[9px] font-black uppercase tracking-wide text-[#4ba8d4]">Calories</span>
                        </div>
                        <div className="flex flex-1 flex-col items-center rounded-xl bg-[#f5f0ff] py-2.5">
                          <span className="text-sm font-black text-[#7c3aed]">{variant.weight}</span>
                          <span className="text-[9px] font-black uppercase tracking-wide text-[#9d71e8]">Weight</span>
                        </div>
                      </div>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Price + CTA */}
                      <div className="mt-5 flex items-center justify-between border-t border-[#00000008] pt-4">
                        <div>
                          <span className="text-2xl font-black text-[#1f1f1f]">₹{variant.price}</span>
                        </div>
                        <Link
                          to={`/product/${variant.slug}`}
                          className="rounded-full bg-[#1f1f1f] px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#ff6b00]"
                        >
                          View Details →
                        </Link>
                      </div>

                      {/* Quick buy row — visible on hover */}
                      <div className={`mt-3 grid grid-cols-1 gap-2 overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-48 ${variant.amazon ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(variant, 1);
                            navigate('/cart');
                          }}
                          className="flex items-center justify-center gap-1.5 rounded-full bg-[#1f1f1f] py-2 text-[10px] font-black uppercase tracking-wide text-white"
                        >
                          🛒 Buy on Website
                        </button>
                        {variant.amazon && (
                          <a
                            href={variant.amazon}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 rounded-full bg-[#ff7a00] py-2 text-[10px] font-black uppercase tracking-wide text-white"
                          >
                            Amazon
                          </a>
                        )}
                        <a
                          href={`https://wa.me/917425049203?text=Hi%2C%20I%27d%20like%20to%20order%20${encodeURIComponent(product.name)}%20from%20RoastedKart%20%F0%9F%A5%9C`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-full bg-[#25d366] py-2 text-[10px] font-black uppercase tracking-wide text-white"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-[2rem] bg-gradient-to-r from-[#ff7a00] via-[#ff3d81] to-[#8b5cf6] p-[2px]">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-[#1a1a1a] px-8 py-10 text-center md:flex-row md:text-left">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff7a00]">Bulk Orders</p>
              <h3 className="mt-1 text-2xl font-black uppercase text-white [font-family:'Space_Grotesk',sans-serif]">
                Need a Larger Quantity?
              </h3>
              <p className="mt-1 text-sm text-[#888]">Corporate gifting, event snacking, or wholesale — we've got you.</p>
            </div>
            <a
              href={`https://wa.me/917425049203?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20bulk%20orders%20from%20RoastedKart`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 rounded-full bg-[#25d366] px-7 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[0_6px_18px_rgba(37,211,102,0.35)] transition hover:shadow-[0_10px_26px_rgba(37,211,102,0.5)]"
            >
              WhatsApp Us →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
