import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { flattenedVariants, products } from "../data/catalog";

gsap.registerPlugin(ScrollTrigger);

export default function ShopPage() {
  const { addToCart } = useCart();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [flavorFilter, setFlavorFilter] = useState("All");

  const categories = useMemo(() => ["All", ...products.map((product) => product.category)], []);
  const flavors = useMemo(() => {
    const unique = new Set();
    flattenedVariants.forEach((variant) => {
      unique.add(variant.name);
    });
    return ["All", ...unique];
  }, []);

  const visibleVariants = useMemo(() => {
    return flattenedVariants.filter((variant) => {
      const categoryOk = categoryFilter === "All" || variant.productCategory === categoryFilter;
      const flavorOk = flavorFilter === "All" || variant.name === flavorFilter;
      return categoryOk && flavorOk;
    });
  }, [categoryFilter, flavorFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".rk-shop-reveal").forEach((node) => {
        gsap.from(node, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 86%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rk-shop-reveal rounded-3xl border border-[#00000012] bg-white p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffca3a]">Shop</p>
          <h1 className="mt-2 text-5xl font-black uppercase tracking-tight [font-family:'Space_Grotesk',sans-serif]">
            Snack Smart. Snack Loud.
          </h1>
          <p className="mt-3 text-[#555]">Filter by category and flavor, then add your chaos stack to cart.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-left text-xs font-black uppercase tracking-[0.14em] text-[#ffca3a]">
              Category
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#00000012] bg-[#fff4e9] px-3 py-3 text-sm font-semibold text-[#1f1f1f] outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <label className="text-left text-xs font-black uppercase tracking-[0.14em] text-[#ffca3a]">
              Flavor
              <select
                value={flavorFilter}
                onChange={(event) => setFlavorFilter(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#00000012] bg-[#fff4e9] px-3 py-3 text-sm font-semibold text-[#1f1f1f] outline-none"
              >
                {flavors.map((flavor) => (
                  <option key={flavor} value={flavor}>{flavor}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="rk-shop-reveal mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visibleVariants.map((variant, idx) => (
            <motion.article
              key={variant.id}
              whileHover={{ y: -8, rotate: idx % 2 === 0 ? -1 : 1, scale: 1.02 }}
              className="group rounded-3xl border border-[#00000012] bg-gradient-to-br from-[#fff6eb] to-[#fff1e1] p-5 shadow-[0_14px_30px_rgba(9,4,25,0.45)]"
            >
              <div className={`h-28 rounded-2xl bg-gradient-to-r ${variant.heroColor} opacity-90`} />
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#ffca3a]">{variant.productCategory}</p>
              <h3 className="mt-2 text-2xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">{variant.name}</h3>
              <p className="mt-1 text-sm text-[#555]">{variant.weight}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-black uppercase">
                <div className="rounded-lg bg-[#ff7a0024] px-2 py-2 text-[#ffd3a7]">{variant.protein}</div>
                <div className="rounded-lg bg-[#d5ff4f24] px-2 py-2 text-[#dcff8a]">{variant.calories}</div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xl font-black text-[#d5ff4f]">Rs {variant.price}</p>
                  <p className="text-xs text-[#b9aacd] line-through">Rs {variant.mrp}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(variant)}
                  className="rounded-full bg-[#ff7a00] px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white"
                >
                  Add to Cart
                </motion.button>
              </div>

              <div className="mt-4 flex gap-2 opacity-0 transition group-hover:opacity-100">
                <a href={variant.amazon} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wide text-[#1d1633]">
                  Amazon
                </a>
                <a href={variant.flipkart} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#0000001f] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-[#1f1f1f]">
                  Flipkart
                </a>
                <Link to={`/product/${variant.slug}`} className="rounded-full bg-[#a855f7] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white">
                  Details
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {visibleVariants.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#00000012] bg-white p-6 text-center text-[#555]">
            No variants found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}

