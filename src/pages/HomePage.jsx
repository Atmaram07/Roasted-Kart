import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products, storeLinks } from "../data/catalog";

gsap.registerPlugin(ScrollTrigger);

const benefits = ["ROASTED NOT FRIED", "NO PALM OIL", "NO MAIDA", "NO ARTIFICIAL FLAVOURS"];
const partners = ["Amazon"];
const press = ["Buzzfeed", "YourStory", "Economic Times", "FoodTech India"];
const reviews = [
  "Finished 3 packs. No regrets.",
  "Gym trainer approved this and stole my stash.",
  "Finally a snack that tastes fun and tracks clean.",
];

const testimonials = [
  {
    quote: "I've tried so many 'healthy' snacks and they all taste like cardboard. RoastedKart is the first one that genuinely slaps. The millet box is my daily go-to now.",
    name: "Priya Ramesh",
    role: "Nutritionist, Bengaluru",
    initials: "PR",
    gradient: "from-[#ff7a00] to-[#ff3d81]",
    stars: "#ff7a00",
  },
  {
    quote: "My gym trainer spotted these in my bag and now our entire squad is hooked. The protein macros are insane for a snack — 21g per pack is no joke.",
    name: "Arjun Khanna",
    role: "Fitness Coach, Mumbai",
    initials: "AK",
    gradient: "from-[#d5ff4f] to-[#8b5cf6]",
    stars: "#d5ff4f",
    initialsText: "text-[#1a1a1a]",
  },
  {
    quote: "Ordered the All-in-One box for a house party and it was gone in 20 minutes. Everyone was asking where to buy more. This brand is going to be massive.",
    name: "Sneha Mehta",
    role: "Food Blogger, Delhi",
    initials: "SM",
    gradient: "from-[#8b5cf6] to-[#ff3d81]",
    stars: "#c084fc",
  },
  {
    quote: "Best guilt-free snack I've found in years. Finally something that doesn't compromise on taste. The peri peri soya pops are dangerously addictive.",
    name: "Rahul Verma",
    role: "Entrepreneur, Jaipur",
    initials: "RV",
    gradient: "from-[#06b6d4] to-[#6366f1]",
    stars: "#67e8f9",
  },
];

const featuredTestimonial = {
  kicker: "Taste test winner",
  quote:
    "I ordered it for the macros. I reordered it for the crunch.",
  name: "Naina Kapoor",
  role: "Brand Strategist, Gurugram",
  subtext: "Healthy snacks usually ask you to lower your expectations. This one doesn't.",
  sticker: "Repeat ordered in 48 hrs",
};

const heroImageModules = import.meta.glob("../assets/hero *.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
  import: "default",
});

const heroImages = Object.entries(heroImageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src], idx) => ({
    id: `hero-${idx + 1}`,
    name: `Hero ${idx + 1}`,
    image: src,
  }));

const heroThemes = [
  {
    glow: "from-[#ffcd94]/55 via-[#ff7a00]/22 to-transparent",
    bubblePrimary: "bg-[#ff7a00] text-white",
    bubbleSecondary: "bg-white text-[#2a1c22]",
    bubbleAccent: "bg-[#ffd26f] text-[#3a2400]",
  },
  {
    glow: "from-[#efffa8]/55 via-[#d5ff4f]/24 to-transparent",
    bubblePrimary: "bg-[#d5ff4f] text-[#182300]",
    bubbleSecondary: "bg-white text-[#182300]",
    bubbleAccent: "bg-[#1f1f1f] text-white",
  },
  {
    glow: "from-[#d7c6ff]/55 via-[#8b5cf6]/20 to-transparent",
    bubblePrimary: "bg-[#8b5cf6] text-white",
    bubbleSecondary: "bg-white text-[#221530]",
    bubbleAccent: "bg-[#8be8ff] text-[#082733]",
  },
];

const heroCallouts = [
  [
    { label: "Snack Drop", text: "Crunch that looks loud" },
    { label: "Clean Win", text: "No fry. No greasy drag." },
    { label: "Desk Stash", text: "Always gone too fast" },
  ],
  [
    { label: "Protein Pop", text: "Gym bag favorite" },
    { label: "Snack Math", text: "Big taste, better macros" },
    { label: "Repeat Buy", text: "Post-workout craving fix" },
  ],
  [
    { label: "Trail Box", text: "All 8 flavours inside" },
    { label: "Party Fuel", text: "Made for passing around" },
    { label: "Crowd Hook", text: "One box, zero leftovers" },
  ],
];

export default function HomePage() {
  const heroShowcase = heroImages.length >= 3 ? heroImages.slice(0, 3) : products.slice(0, 3);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialTimer = useRef(null);
  const activeHero = heroShowcase[activeHeroIndex];
  const activeHeroTheme = heroThemes[activeHeroIndex % heroThemes.length];
  const activeHeroCallouts = heroCallouts[activeHeroIndex % heroCallouts.length];

  const startTestimonialTimer = useCallback(() => {
    testimonialTimer.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTestimonialTimer();
    return () => clearInterval(testimonialTimer.current);
  }, [startTestimonialTimer]);

  const goToTestimonial = (idx) => {
    clearInterval(testimonialTimer.current);
    setActiveTestimonial(idx);
    startTestimonialTimer();
  };

  useEffect(() => {
    heroShowcase.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, [heroShowcase]);

  useEffect(() => {
    const autoRotate = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroShowcase.length);
    }, 4200);
    return () => clearInterval(autoRotate);
  }, [heroShowcase.length]);

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
              className="relative mb-6 h-[380px] md:h-[500px]"
              initial={{ scale: 0.98 }}
              animate={{ scale: [0.98, 1, 0.98] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className={`absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br ${activeHeroTheme.glow} blur-3xl`} />
              <div className="absolute left-5 top-28 h-24 w-24 rounded-full border border-white/45 bg-white/25 backdrop-blur-sm md:left-14 md:h-28 md:w-28" />
              <div className="absolute right-3 top-16 h-16 w-16 rounded-full border border-black/5 bg-[#d5ff4f]/40 backdrop-blur-sm md:right-14 md:h-20 md:w-20" />
              <div className="absolute bottom-16 right-8 h-20 w-20 rounded-full border border-white/40 bg-white/18 backdrop-blur-sm md:h-24 md:w-24" />
              <div className="absolute bottom-8 left-12 hidden h-14 w-14 rounded-full border border-[#ff7a00]/20 bg-[#ff7a00]/10 backdrop-blur-sm md:block" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeHero.id}-callout-a`}
                  initial={{ opacity: 0, y: -16, rotate: -7 }}
                  animate={{ opacity: 1, y: [0, -6, 0], rotate: [-7, -4, -7] }}
                  exit={{ opacity: 0, y: -16, rotate: -7 }}
                  transition={{
                    opacity: { duration: 0.35 },
                    y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute left-0 top-8 z-30 max-w-[10rem] rounded-[1.25rem] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.14)] ${activeHeroTheme.bubblePrimary}`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-80">{activeHeroCallouts[0].label}</p>
                  <p className="mt-1 text-sm font-black uppercase leading-tight">{activeHeroCallouts[0].text}</p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeHero.id}-callout-b`}
                  initial={{ opacity: 0, x: 16, rotate: 6 }}
                  animate={{ opacity: 1, y: [0, 6, 0], rotate: [6, 3, 6] }}
                  exit={{ opacity: 0, x: 16, rotate: 6 }}
                  transition={{
                    opacity: { duration: 0.35 },
                    y: { duration: 4.1, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4.1, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute right-0 top-24 z-30 hidden max-w-[10rem] rounded-[1.25rem] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.14)] sm:block ${activeHeroTheme.bubbleSecondary}`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">{activeHeroCallouts[1].label}</p>
                  <p className="mt-1 text-sm font-black uppercase leading-tight">{activeHeroCallouts[1].text}</p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeHero.id}-callout-c`}
                  initial={{ opacity: 0, y: 16, rotate: -5 }}
                  animate={{ opacity: 1, y: [0, 7, 0], rotate: [-5, -2, -5] }}
                  exit={{ opacity: 0, y: 16, rotate: -5 }}
                  transition={{
                    opacity: { duration: 0.35 },
                    y: { duration: 4.3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4.3, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute bottom-10 left-8 z-30 hidden max-w-[10rem] rounded-[1.25rem] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.14)] sm:block ${activeHeroTheme.bubbleAccent}`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-75">{activeHeroCallouts[2].label}</p>
                  <p className="mt-1 text-sm font-black uppercase leading-tight">{activeHeroCallouts[2].text}</p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeHero.id}
                  src={activeHero.image}
                  alt={activeHero.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute left-1/2 top-16 z-20 h-[285px] w-[220px] -translate-x-1/2 rounded-[2.4rem] object-cover shadow-[0_36px_80px_rgba(0,0,0,0.22)] ring-1 ring-white/70 md:h-[390px] md:w-[300px]"
                  initial={{ opacity: 0, y: 20, rotate: -2, scale: 0.94 }}
                  animate={{ opacity: 1, y: [0, -14, 0], rotate: [-2, 1, -2], scale: 1 }}
                  exit={{ opacity: 0, y: -16, rotate: 2, scale: 0.94 }}
                  transition={{
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    y: { duration: 4.1, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4.1, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
              </AnimatePresence>

              <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
                {heroShowcase.map((item, idx) => (
                  <span
                    key={item.id}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeHeroIndex ? "w-10 bg-[#1f1f1f]" : "w-2 bg-[#1f1f1f]/25"
                    }`}
                  />
                ))}
              </div>
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

      <section className="rk-reveal relative overflow-hidden bg-[#111111] px-4 py-20 text-white md:px-8">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff7a00]/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff9d57]">
                  {featuredTestimonial.kicker}
                </p>
                <blockquote className="mt-4 text-4xl font-black uppercase leading-[0.95] text-white [font-family:'Space_Grotesk',sans-serif] md:text-6xl">
                  "{featuredTestimonial.quote}"
                </blockquote>
                <p className="mt-5 max-w-2xl text-sm text-[#cfc2d8] md:text-base">
                  {featuredTestimonial.subtext}
                </p>
              </div>

              <motion.div
                whileHover={{ rotate: 2, y: -4 }}
                className="w-fit rotate-[-4deg] rounded-[1.75rem] bg-[#d5ff4f] px-6 py-5 text-[#161616] shadow-[0_18px_50px_rgba(213,255,79,0.2)]"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Snack verdict</p>
                <p className="mt-2 max-w-[12rem] text-2xl font-black uppercase leading-none [font-family:'Space_Grotesk',sans-serif]">
                  {featuredTestimonial.sticker}
                </p>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-white">{featuredTestimonial.name}</p>
                <p className="mt-1 text-sm text-[#9f92ac]">{featuredTestimonial.role}</p>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ffb77c]">
                4.9/5 taste rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="rk-reveal bg-white px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Watch The Crunch Story</h2>
          <div className="mt-7 overflow-hidden rounded-3xl border border-[#00000014] bg-black shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="relative w-full pt-[56.25%]">
              <iframe className="absolute inset-0 h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="RoastedKart Brand Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          </div>
        </div>
      </section> */}

      <section className="rk-reveal border-y border-[#00000012] bg-[#fff8ef] px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Snack Tribe Feed</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((review, idx) => (
              <motion.article key={review} whileHover={{ y: -4 }} className={`rounded-2xl p-5 ${idx % 2 === 0 ? "bg-[#ff7a00] text-white" : "bg-white text-[#2c2146] border border-[#00000012]"}`}>
                <p className="text-sm font-black uppercase tracking-[0.1em]">@RoastiVibes</p>
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

      {/* <section className="rk-reveal bg-white px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-5 text-center text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">As Seen In</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {press.map((logo) => (
              <div key={logo} className="rounded-2xl border border-[#00000012] bg-[#fffaf4] p-5 text-center text-sm font-black uppercase tracking-[0.12em] text-[#ff6b00]">{logo}</div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="rk-reveal bg-[#1a1a1a] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[#ff7a00]">What They're Saying</p>
          <h2 className="mt-2 text-center text-4xl font-black uppercase text-white [font-family:'Space_Grotesk',sans-serif]">
            The Tribe Speaks
          </h2>

          {/* Carousel */}
          <div className="relative mt-10 overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              {testimonials.map((t, idx) =>
                idx === activeTestimonial ? (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className={`rounded-3xl bg-gradient-to-br ${t.gradient} p-[2px]`}
                  >
                    <div className="rounded-3xl bg-[#111] p-8 md:p-10">
                      <div className="flex gap-1" style={{ color: t.stars }}>
                        {"★★★★★".split("").map((s, i) => <span key={i} className="text-xl">{s}</span>)}
                      </div>
                      <p className="mt-5 text-lg font-semibold leading-relaxed text-[#e8e8e8] md:text-xl">
                        "{t.quote}"
                      </p>
                      <div className="mt-7 flex items-center gap-4">
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-black ${t.initialsText ?? "text-white"}`}>
                          {t.initials}
                        </div>
                        <div>
                          <p className="font-black uppercase tracking-wide text-white">{t.name}</p>
                          <p className="text-xs text-[#888]">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => goToTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffff20] bg-[#ffffff10] text-white transition hover:bg-[#ff7a00] hover:border-[#ff7a00]"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToTestimonial(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeTestimonial ? "w-6 bg-[#ff7a00]" : "w-2 bg-[#444]"}`}
                />
              ))}
            </div>
            <button
              onClick={() => goToTestimonial((activeTestimonial + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffff20] bg-[#ffffff10] text-white transition hover:bg-[#ff7a00] hover:border-[#ff7a00]"
            >
              ›
            </button>
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
