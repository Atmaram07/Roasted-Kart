import { motion } from "framer-motion";

const values = [
  {
    title: "Flavor Is Non-Negotiable",
    line: "If a snack does not make you smile, it does not make the shelf. We build around taste first.",
  },
  {
    title: "Healthy But Never Boring",
    line: "Clean labels and smart macros without sterile wellness-brand vibes.",
  },
  {
    title: "Culture-Led Snacking",
    line: "We remix Indian snack nostalgia for modern, playful energy.",
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
          <h1 className="mt-2 text-5xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Snack Party With A Purpose</h1>
          <p className="mx-auto mt-4 max-w-3xl text-[#4d4d4d]">
            We created RoastedKart for people who love bold snack culture but want cleaner choices. No bland health
            tone, no boring flavor.
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

        <div className="rounded-3xl border border-[#00000012] bg-white p-7">
          <h2 className="text-3xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Founder Story</h2>
          <div className="mt-4 space-y-3 text-[#555]">
              <p>
                RoastedKart started with one frustration: health snacks felt boring and snacks with taste felt heavy.
                We wanted both worlds in one bite.
              </p>
              <p>
                From college-kitchen prototypes to production scale, we tuned crunch, seasoning, and macros until each
                pack felt like a celebration and not a compromise.
              </p>
              <p>
                Today, RoastedKart is our answer to snack guilt: flavor you crave with ingredients you can trust.
              </p>
          </div>
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
