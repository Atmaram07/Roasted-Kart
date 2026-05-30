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
          <div className="mt-4 space-y-4 text-[#555]">
            <h3 className="text-xl font-black">The Heart Behind the Crunch</h3>
            <p>
              It began with a mother turning over a snack packet in a grocery aisle, searching for something she
              could trust. Instead, she found a list of compromises: palm oil, heavy preservatives, and synthetic
              flavours. Like any parent, she wanted better for her family. But looking around, she realized a
              frustrating truth—the modern snack industry had sacrificed long-term health for short-term taste.
            </p>
            <p>
              She refused to accept that compromise. If a truly honest, delicious snack didn't exist, she would build
              it from scratch.
            </p>

            <h3 className="text-xl font-black">From a Mother’s Kitchen to the Roasted Kart Identity</h3>
            <p>
              For two years, her home kitchen became a laboratory of love. She completely rejected the industry
              standard of deep-frying, choosing instead the patient, meticulous art of slow-roasting. She replaced
              empty calories with nutrient-dense millets, grains, and pulses, blending them with authentic,
              hand-picked spices.
            </p>
            <p>
              It wasn’t an easy path. There were countless late nights, collapsed batches, and moments of doubt when
              the crunch wasn’t perfect. But giving up wasn’t an option. This wasn’t a business plan yet; it was a mother
              protecting her family’s well-being.
            </p>
            <p>Through that stubborn care, she perfected the unique, bold profiles that define the Roasted Kart experience today:</p>

            <ul className="list-disc ml-5 space-y-2 text-sm text-[#555]">
              <li><strong>Classic Chatpata:</strong> The comforting, nostalgic tang of traditional home-style spices.</li>
              <li><strong>Pudina Zest:</strong> A refreshing, herb-infused burst of crisp coolness.</li>
              <li><strong>Peri Peri Roast:</strong> A fiery, modern kick for the adventurous palate.</li>
              <li><strong>Khatta Meetha Twist:</strong> The perfect, delicate balance of sweet and savory notes.</li>
            </ul>

            <h3 className="text-xl font-black mt-2">The Roasted Kart Promise</h3>
            <p>
              We didn't start in a boardroom; we started at the heart of the home. Today, Roasted Kart stands as a
              premium tech-forward food brand built on three unbreakable pillars:
            </p>
            <p className="font-black">0% Palm Oil. 100% Slow-Roasted. Zero Compromise.</p>
            <p>
              Every pack we seal carries the warmth of homemade effort, the precision of clean food crafting, and the
              absolute promise of mindful snacking. We prove that healthy eating never has to feel boring, and bold
              flavor doesn't require a deep-fryer.
            </p>
            <p>From our kitchen to your home, welcome to the Roasted Kart family. Taste the care in every crunch.</p>
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
