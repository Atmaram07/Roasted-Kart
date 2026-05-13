import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products, storeLinks } from "../data/catalog";
import soyaPopsGraphic from "../assets/soya-pops.png";

gsap.registerPlugin(ScrollTrigger);

const benefits = ["ROASTED NOT FRIED", "NO PALM OIL", "NO MAIDA", "NO ARTIFICIAL FLAVOURS"];
const partners = ["Amazon", "Flipkart"];
const press = ["Buzzfeed", "YourStory", "Economic Times", "FoodTech India"];
const reviews = [
  "Finished 3 packs. No regrets.",
  "Gym trainer approved this and stole my stash.",
  "Finally a snack that tastes fun and tracks clean.",
];

export default function HomePage() {
  const heroProduct = products[0];
  const [activeVariant, setActiveVariant] = useState(0);
  const [email, setEmail] = useState("");
  const current = useMemo(() => heroProduct.variants[activeVariant], [heroProduct.variants, activeVariant]);

  useEffect(() => {
    const autoRotate = setInterval(() => {
      setActiveVariant((prev) => (prev + 1) % heroProduct.variants.length);
    }, 2600);
    return () => clearInterval(autoRotate);
  }, [heroProduct.variants.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rk-hero-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.utils.toArray(".rk-reveal").forEach((node) => {
        gsap.from(node, {
          y: 35,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 86%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff8ef] via-[#fff3e6] to-[#fff8ef] px-4 pb-16 pt-16 md:px-8 md:pt-20">
        <div className="rk-soft-blob rk-soft-blob-a" />
        <div className="rk-soft-blob rk-soft-blob-b" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-[#1f1f1f]">
            <p className="rk-hero-reveal inline-flex rounded-full bg-[#1f1f1f] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffd26f]">
              No fry. All fly.
            </p>
            <h1 className="rk-hero-reveal mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tight [font-family:'Space_Grotesk',sans-serif] sm:text-6xl md:text-7xl">
              Roasted.
              <br />
              Not Boring.
            </h1>
            <p className="rk-hero-reveal mt-4 max-w-xl text-base text-[#4b4b4b] md:text-xl">
              Three curated snack boxes, one clean brand. Crunch that hits different without boring health-brand energy.
            </p>

            <div className="rk-hero-reveal mt-7 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#ff7a00] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">No Palm Oil</span>
              <span className="rounded-full bg-[#9b5de5] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">High Protein</span>
              <span className="rounded-full bg-[#d5ff4f] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#1a2b00]">Snack Loud</span>
            </div>

            <div className="rk-hero-reveal mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="rounded-full bg-gradient-to-r from-[#ff7a00] via-[#ff3d81] to-[#8b5cf6] px-7 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_30px_rgba(255,61,129,0.3)]">
                Grab The Crunch
              </Link>
              <a href="#where-to-buy" className="rounded-full border border-[#00000020] bg-white px-7 py-3 text-sm font-black uppercase tracking-wide text-[#2b2b2b]">
                Where To Buy
              </a>
            </div>
          </div>

          <motion.div className="relative" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div
              className="mb-6 overflow-hidden rounded-[2rem] border border-[#00000014] bg-white shadow-[0_24px_50px_rgba(255,107,0,0.18)]"
              initial={{ scale: 0.98 }}
              animate={{ scale: [0.98, 1, 0.98] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.img
                src={soyaPopsGraphic}
                alt="Healthy soya pops snack graphic"
                className="w-full max-w-full object-cover"
                initial={{ y: 0, rotate: 0 }}
                animate={{ y: [0, -14, 0], rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#ff7a00] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#ff7a0014]">
                Healthy Soya Pops
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-6 top-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#d5ff4f] text-center text-xs font-black uppercase tracking-[0.08em] text-[#1b2a00] shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
              animate={{ x: [0, -10, 0], y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Soya Pop
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="where-to-buy" className="rk-reveal border-y border-[#00000012] bg-white px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Where To Buy</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <motion.div key={partner} whileHover={{ y: -4 }} className="rounded-2xl border border-[#00000012] bg-[#fff8ef] p-5 text-center">
                <p className="text-lg font-black uppercase tracking-wide text-[#ff6b00]">{partner}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="rk-reveal bg-[#fff8ef] px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Our Boxes</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {products.map((product, idx) => (
              <motion.article key={product.id} whileHover={{ y: -6, rotate: idx % 2 === 0 ? -1 : 1 }} className={`rounded-3xl bg-gradient-to-br ${product.heroColor} p-[2px]`}>
                <div className="h-full rounded-3xl bg-white p-6">
                  <img src={product.image} alt={product.name} className="mx-auto h-56 w-full max-w-[320px] object-contain" />
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#8b4b00]">{product.category}</p>
                  <h3 className="mt-3 text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">{product.name}</h3>
                  <p className="mt-3 text-sm text-[#555]">{product.shortDescription}</p>
                  <Link to="/shop" className="mt-5 inline-block rounded-full bg-[#1f1f1f] px-5 py-2 text-xs font-black uppercase tracking-wide text-[#ffd26f]">Explore</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="rk-reveal bg-[#ff6b00] px-4 py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rk-benefits-track-light">
            {benefits.concat(benefits).map((item, idx) => (
              <span key={`${item}-${idx}`} className="mx-4 inline-flex items-center text-sm font-black uppercase tracking-[0.18em] text-white">
                <span className="mr-2 text-[#ffd26f]">*</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rk-reveal bg-white px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Hot Sellers</h2>
            <Link to="/shop" className="text-sm font-black uppercase text-[#ff6b00]">See all</Link>
          </div>
          <div className="no-scrollbar flex gap-5 overflow-x-auto pb-2">
            {products.map((product, idx) => {
              const variant = product.variants[0];
              return (
                <motion.article
                  key={product.id}
                  whileHover={{ y: -6, rotate: idx % 2 === 0 ? -0.6 : 0.6 }}
                  className={`min-w-[320px] rounded-3xl bg-gradient-to-br ${product.heroColor} p-[2px] shadow-[0_14px_30px_rgba(0,0,0,0.08)]`}
                >
                  <div className="h-full rounded-3xl bg-[#fffaf4] p-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-44 w-full rounded-2xl object-contain"
                    />
                    <p className="mt-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#ff6b00]">{product.category}</p>
                    <h3 className="mt-1 text-xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">{product.name}</h3>
                    <p className="mt-2 text-sm text-[#555]">{product.shortDescription}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-black uppercase">
                      {variant.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full bg-[#fff0e4] px-3 py-1 text-[#8b4b00]">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xl font-black text-[#ff6b00]">Rs {variant.price}</p>
                        <p className="text-xs text-[#aaa] line-through">Rs {variant.mrp}</p>
                      </div>
                      <Link
                        to={`/product/${variant.slug}`}
                        className="rounded-full bg-[#1f1f1f] px-4 py-2 text-[11px] font-black uppercase tracking-wide text-[#ffd26f]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rk-reveal border-y border-[#00000012] bg-[#fff2e0] px-4 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-[#00000012] bg-white p-6">
            <h2 className="text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Brand Story</h2>
            <p className="mt-4 text-[#444]">Snacking should be fun, not boring. We kept the wild flavor, removed the greasy drag, and built a snack party you can enjoy guilt-free.</p>
            <p className="mt-3 text-[#444]">Every SKU is tested for taste first, macro second, vibe always.</p>
          </div>
          <div className="rotate-[-2deg] rounded-3xl bg-gradient-to-br from-[#ff7a00] via-[#ff3d81] to-[#8b5cf6] p-[2px]">
            <div className="rotate-[2deg] rounded-3xl bg-white p-8 text-center text-[#333]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6b00]">Model + Pack Visual</p>
              <h3 className="mt-3 text-3xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Snack Party Energy</h3>
              <p className="mt-2 text-sm">Use your lifestyle/founder image here for the final production site.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rk-reveal bg-white px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Watch The Crunch Story</h2>
          <div className="mt-7 overflow-hidden rounded-3xl border border-[#00000014] bg-black shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="relative w-full pt-[56.25%]">
              <iframe className="absolute inset-0 h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="RoastedKart Brand Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          </div>
        </div>
      </section>

      <section className="rk-reveal border-y border-[#00000012] bg-[#fff8ef] px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Snack Tribe Feed</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((review, idx) => (
              <motion.article key={review} whileHover={{ y: -4 }} className={`rounded-2xl p-5 ${idx % 2 === 0 ? "bg-[#ff7a00] text-white" : "bg-white text-[#2c2146] border border-[#00000012]"}`}>
                <p className="text-sm font-black uppercase tracking-[0.1em]">@taali-style-vibes</p>
                <p className="mt-3 text-base font-semibold">{review}</p>
              </motion.article>
            ))}
            <motion.article whileHover={{ y: -4 }} className="rounded-2xl bg-[#a855f7] p-5 text-white">
              <p className="text-sm font-black uppercase tracking-[0.1em]">@snackbeast</p>
              <p className="mt-3 text-base font-semibold">Crunch that hits different. Legit no cap.</p>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="rk-reveal bg-white px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-5 text-center text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">As Seen In</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {press.map((logo) => (
              <div key={logo} className="rounded-2xl border border-[#00000012] bg-[#fffaf4] p-5 text-center text-sm font-black uppercase tracking-[0.12em] text-[#ff6b00]">{logo}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="rk-reveal bg-[#1a1a1a] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[#ff7a00]">What They're Saying</p>
          <h2 className="mt-2 text-center text-4xl font-black uppercase text-white [font-family:'Space_Grotesk',sans-serif]">
            The Tribe Speaks
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {/* Testimonial 1 */}
            <motion.article
              whileHover={{ y: -6, rotate: -0.8 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff7a00] to-[#ff3d81] p-[2px]"
            >
              <div className="h-full rounded-3xl bg-[#111] p-7">
                <div className="flex gap-1 text-[#ff7a00]">
                  {"★★★★★".split("").map((s, i) => <span key={i} className="text-lg">{s}</span>)}
                </div>
                <p className="mt-4 text-base font-semibold leading-relaxed text-[#e8e8e8]">
                  "I've tried so many 'healthy' snacks and they all taste like cardboard. RoastedKart is the first one that genuinely slaps. The millet box is my daily go-to now."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7a00] to-[#ff3d81] text-sm font-black text-white">
                    PR
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-white">Priya Ramesh</p>
                    <p className="text-xs text-[#888]">Nutritionist, Bengaluru</p>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Testimonial 2 */}
            <motion.article
              whileHover={{ y: -6, rotate: 0.8 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#d5ff4f] to-[#8b5cf6] p-[2px]"
            >
              <div className="h-full rounded-3xl bg-[#111] p-7">
                <div className="flex gap-1 text-[#d5ff4f]">
                  {"★★★★★".split("").map((s, i) => <span key={i} className="text-lg">{s}</span>)}
                </div>
                <p className="mt-4 text-base font-semibold leading-relaxed text-[#e8e8e8]">
                  "My gym trainer spotted these in my bag and now our entire squad is hooked. The protein macros are insane for a snack — 21g per pack is no joke."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#d5ff4f] to-[#8b5cf6] text-sm font-black text-[#1a1a1a]">
                    AK
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-white">Arjun Khanna</p>
                    <p className="text-xs text-[#888]">Fitness Coach, Mumbai</p>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Testimonial 3 */}
            <motion.article
              whileHover={{ y: -6, rotate: -0.8 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#8b5cf6] to-[#ff3d81] p-[2px]"
            >
              <div className="h-full rounded-3xl bg-[#111] p-7">
                <div className="flex gap-1 text-[#c084fc]">
                  {"★★★★★".split("").map((s, i) => <span key={i} className="text-lg">{s}</span>)}
                </div>
                <p className="mt-4 text-base font-semibold leading-relaxed text-[#e8e8e8]">
                  "Ordered the All-in-One box for a house party and it was gone in 20 minutes. Everyone was asking where to buy more. This brand is going to be massive."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ff3d81] text-sm font-black text-white">
                    SM
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-white">Sneha Mehta</p>
                    <p className="text-xs text-[#888]">Food Blogger, Delhi</p>
                  </div>
                </div>
              </div>
            </motion.article>

          </div>
        </div>
      </section>

      <section className="rk-reveal bg-gradient-to-r from-[#ff7a00] via-[#ff3d81] to-[#8b5cf6] px-4 py-14 text-white md:px-8">

        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-black uppercase [font-family:'Space_Grotesk',sans-serif]">Ready To Snack Smarter?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[#ffe7ff]">Get launch drops, bundle offers, and early access to new flavor madness.</p>
          <form onSubmit={(event) => { event.preventDefault(); setEmail(""); }} className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Enter your email" className="w-full rounded-full border border-white/40 bg-white/15 px-5 py-3 text-sm font-semibold text-white placeholder:text-[#fce9ff] outline-none" />
            <button className="rounded-full bg-[#101726] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#d5ff4f]">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
