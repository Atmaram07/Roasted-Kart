import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductBySlug, getVariantBySlug } from "../data/catalog";

const TABS = ["Benefits", "Ingredients", "Nutrition", "Reviews"];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ProductPage() {
  const { variantSlug } = useParams();
  const navigate = useNavigate();

  const [selectedVariantSlug, setSelectedVariantSlug] = useState(variantSlug);
  const [activeTab, setActiveTab] = useState("Benefits");

  const variant = useMemo(() => getVariantBySlug(selectedVariantSlug), [selectedVariantSlug]);
  const product = useMemo(() => (variant ? getProductBySlug(variant.productSlug) : null), [variant]);

  if (!variant || !product) {
    return (
      <section className="min-h-screen bg-[#fff8ef] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#00000012] bg-white p-8 text-center text-[#555]">
          Product not found.
        </div>
      </section>
    );
  }

  const onVariantChange = (slug) => {
    setSelectedVariantSlug(slug);
    navigate(`/product/${slug}`);
  };

  const discount = Math.round(((variant.mrp - variant.price) / variant.mrp) * 100);
  const savings = variant.mrp - variant.price;

  return (
    <div className="min-h-screen bg-[#fff8ef]">

      {/* Breadcrumb */}
      <div className="border-b border-[#00000010] bg-white px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs font-semibold text-[#888]">
          <Link to="/" className="transition hover:text-[#ff6b00]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="transition hover:text-[#ff6b00]">Shop</Link>
          <span>/</span>
          <span className="text-[#1f1f1f]">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ── LEFT: Product Image ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Main image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
            >
              {/* Gradient top strip */}
              <div className={`h-2 w-full bg-gradient-to-r ${product.heroColor}`} />



              <div className="flex items-center justify-center p-10">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-72 w-full object-contain md:h-[380px]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Tags below image */}
            <div className="mt-4 flex flex-wrap gap-2">
              {variant.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#ff6b00]/25 bg-[#fff0e4] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-[#8b4b00]">
                  {tag}
                </span>
              ))}
              <span className="rounded-full border border-[#00000015] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wide text-[#555]">
                {variant.weight}
              </span>
            </div>

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { icon: "🔥", label: "Roasted\nNot Fried" },
                { icon: "🚫", label: "No Palm\nOil" },
                { icon: "✅", label: "No\nMaida" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1 rounded-2xl border border-[#00000010] bg-white py-3 text-center">
                  <span className="text-xl">{b.icon}</span>
                  <p className="text-[10px] font-black uppercase leading-tight tracking-wide text-[#555]" style={{ whiteSpace: "pre-line" }}>{b.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Category pill */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ff6b00]/10 px-4 py-1.5">
              <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${product.heroColor}`} />
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#ff6b00]">{product.category}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-black uppercase leading-tight text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif] md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#666]">{product.longDescription}</p>
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 text-[#ff6b00]">★★★★★</div>
              <span className="text-sm font-semibold text-[#555]">4.8 · <span className="text-[#ff6b00]">Verified Buyers</span></span>
            </div>

            {/* Price block */}
            <div className="rounded-2xl border border-[#00000010] bg-white p-5">
              <span className="text-4xl font-black text-[#1f1f1f]">₹{variant.price}</span>
              <p className="mt-1 text-xs text-[#aaa]">Inclusive of all taxes · Free delivery above ₹499</p>
            </div>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#888]">Choose Pack</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onVariantChange(item.slug)}
                      className={`rounded-full border px-5 py-2 text-xs font-black uppercase tracking-wide transition ${
                        item.slug === selectedVariantSlug
                          ? "border-[#ff6b00] bg-[#ff6b00] text-white shadow-[0_4px_14px_rgba(255,107,0,0.35)]"
                          : "border-[#00000018] bg-white text-[#444] hover:border-[#ff6b00]/50"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <a
                  href={variant.amazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff3d81] py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(255,107,0,0.3)] transition hover:shadow-[0_12px_30px_rgba(255,107,0,0.45)]"
                >
                  <span>🛒</span> Buy on Amazon
                </a>
                <a
                  href={variant.flipkart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#1f1f1f] bg-white py-4 text-sm font-black uppercase tracking-wide text-[#1f1f1f] transition hover:bg-[#1f1f1f] hover:text-white"
                >
                  Buy on Flipkart
                </a>
              </div>
              <a
                href={`https://wa.me/917425049203?text=Hi%2C%20I%27d%20like%20to%20order%20${encodeURIComponent(product.name)}%20from%20RoastedKart%20%F0%9F%A5%9C`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_6px_18px_rgba(37,211,102,0.3)] transition hover:shadow-[0_10px_26px_rgba(37,211,102,0.45)]"
              >
                <WhatsAppIcon /> Order Directly on WhatsApp
              </a>
            </div>

            {/* Delivery info strip */}
            <div className="flex flex-wrap gap-4 rounded-2xl border border-[#00000010] bg-[#f9f5f0] px-5 py-4 text-xs font-semibold text-[#555]">
              <span>🚚 Ships in 1–2 days</span>
              <span>📦 Secure packaging</span>
              <span>↩️ Easy returns</span>
            </div>
          </motion.div>
        </div>

        {/* ── Tabbed Details Section ── */}
        <div className="mt-12">
          {/* Tab bar */}
          <div className="flex gap-1 overflow-x-auto rounded-2xl border border-[#00000010] bg-white p-1.5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wide transition whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#1f1f1f] text-white shadow-md"
                    : "text-[#888] hover:text-[#1f1f1f]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-4 rounded-3xl border border-[#00000010] bg-white p-6 md:p-8"
            >
              {activeTab === "Benefits" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.benefits.map((item, idx) => (
                    <div key={item} className="flex items-start gap-4 rounded-2xl border border-[#00000008] bg-[#fff8ef] p-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#ff6b00] text-sm font-black text-white">
                        0{idx + 1}
                      </div>
                      <div>
                        <p className="font-black uppercase text-[#1f1f1f]">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Ingredients" && (
                <div className="max-w-2xl">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#ff6b00]">What's Inside</p>
                  <p className="mt-3 text-base leading-relaxed text-[#444]">{variant.ingredients || product.ingredients}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {["No Preservatives", "No Palm Oil", "No Maida", "Roasted Only"].map((badge) => (
                      <div key={badge} className="rounded-xl border border-[#00000010] bg-[#fff8ef] p-3 text-center text-xs font-black uppercase text-[#8b4b00]">
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Nutrition" && (
                <div className="max-w-sm">
                  <div className="mb-4 flex items-baseline justify-between border-b-2 border-[#1f1f1f] pb-2">
                    <p className="text-xl font-black uppercase text-[#1f1f1f]">Nutrition Facts</p>
                    <p className="text-sm text-[#888]">per {product.nutrition.serving}</p>
                  </div>
                  {[
                    { label: "Calories", value: product.nutrition.calories, big: true },
                    { label: "Protein", value: product.nutrition.protein },
                    { label: "Total Fat", value: product.nutrition.fat },
                    { label: "Total Carbohydrates", value: product.nutrition.carbs },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between border-b border-[#00000010] py-2.5 ${row.big ? "font-black" : "font-semibold"}`}
                    >
                      <span className={`${row.big ? "text-base text-[#1f1f1f]" : "text-sm text-[#444]"}`}>{row.label}</span>
                      <span className={`${row.big ? "text-base text-[#ff6b00]" : "text-sm text-[#1f1f1f]"}`}>{row.value}</span>
                    </div>
                  ))}
                  <p className="mt-3 text-xs text-[#aaa]">* Daily values may vary based on your calorie needs.</p>
                </div>
              )}

              {activeTab === "Reviews" && (
                <div className="grid gap-4 md:grid-cols-3">
                  {product.reviews.map((review, idx) => (
                    <div key={review} className="flex flex-col gap-3 rounded-2xl border border-[#00000010] p-5">
                      <div className="flex gap-0.5 text-[#ff6b00]">★★★★★</div>
                      <p className="flex-1 text-sm leading-relaxed text-[#444]">"{review}"</p>
                      <p className="text-xs font-black uppercase tracking-wide text-[#bbb]">— Verified Buyer</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-[#00000015] bg-white px-5 py-2.5 text-sm font-black uppercase tracking-wide text-[#444] transition hover:border-[#ff6b00] hover:text-[#ff6b00]"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
