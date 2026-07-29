import { motion } from "framer-motion";

const values = [
  {
    title: "Mission",
    line: "To make bold, healthier snacking accessible across India without compromising on taste.",
  },
  {
    title: "Quality First",
    line: "We roast with care, use clean ingredients, and never settle for anything less than a crunchy delight.",
  },
  {
    title: "Snack Smarter",
    line: "We believe healthy snacks should feel exciting, not clinical.",
  },
];

const journey = [
  { year: "2024", event: "Kitchen Trials", detail: "Hundreds of roast and seasoning experiments." },
  { year: "2025", event: "Flavor Lab", detail: "Built 3 product lines and one trail box with 8 flavours." },
  { year: "2026", event: "Nationwide Launch", detail: "Marketplace-first scale with community traction." },
];

export default function AboutPage() {
  return (
    <section className="bg-[#fff8ef] px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl border border-[#00000012] bg-gradient-to-br from-[#ffe9d1] to-[#fff8ef] p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b00]">About RoastedKart</p>
          <h1 className="mt-2 text-5xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">The story behind the crunch.</h1>
          <p className="mx-auto mt-4 max-w-3xl text-[#4d4d4d]">
            RoastedKart started as a search for better snack choices: bolder taste, cleaner ingredients, and real snack joy.
          </p>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[#8b4b00]">
            A Brand of Your Diet Factory
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value, idx) => (
            <motion.article
              key={value.title}
              whileHover={{ y: -5, rotate: idx % 2 === 0 ? -0.8 : 0.8 }}
              className="rounded-2xl border border-[#00000012] bg-white p-6 shadow-[0_10px_22px_rgba(22,22,22,0.06)]"
            >
              <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">{value.title}</h2>
              <p className="mt-3 text-sm text-[#555]">{value.line}</p>
            </motion.article>
          ))}
        </div>

        <div className="rounded-3xl border border-[#00000012] bg-white p-7 space-y-6 text-[#555]">
          <article className="space-y-3">
            <h2 className="text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Brand story</h2>
            <p>
              RoastedKart was born from a simple frustration: modern snacks were either too indulgent or too bland. We wanted something that delivered both bold flavour and mindful ingredients.
            </p>
            <p>
              Our founder began by testing recipes in a small kitchen, choosing slow roasting instead of frying and blending authentic Indian spices with nutrient-rich grains.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Mission</h2>
            <p>
              Our mission is to make healthier snacking exciting for every occasion. We believe snacks should energize your day without compromising on flavour or quality.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Why RoastedKart was started</h2>
            <p>
              We started RoastedKart because too many ‘healthy’ snacks felt boring and too many tasty snacks felt unhealthy. We set out to build a snack brand that bridges that gap.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Quality commitment</h2>
            <p>
              We use clean ingredients, avoid palm oil, and roast each batch carefully to preserve flavour and texture. Every product is crafted with quality checks at every stage.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Healthy snacking philosophy</h2>
            <p>
              Healthy snacks should be satisfying, nourishing, and fun. We combine whole grains, pulses, and authentic spices so you can snack with confidence.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Manufacturing standards</h2>
            <p>
              Our products are made under strict hygiene and quality standards. We follow best practices for sourcing, roasting, and packaging to ensure freshness and safety.
            </p>
          </article>
        </div>

        <div className="rounded-3xl border border-[#00000012] bg-[#fff2e0] p-7">
          <h2 className="text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Milestones</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {journey.map((step) => (
              <div key={step.year} className="rounded-2xl border border-[#00000012] bg-white p-5">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#ff6b00]">{step.year}</p>
                <h3 className="mt-2 text-xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">{step.event}</h3>
                <p className="mt-2 text-sm text-[#555]">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
