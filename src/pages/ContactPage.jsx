import { motion } from "framer-motion";

const social = [
  { label: "Instagram", handle: "@roastedkart" },
  { label: "YouTube", handle: "RoastedKart Snacks" },
  { label: "LinkedIn", handle: "RoastedKart" },
];

export default function ContactPage() {
  return (
    <section className="bg-[#fff8ef] px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl border border-[#00000012] bg-gradient-to-br from-[#ffe9d1] to-[#fff8ef] p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b00]">Contact Us</p>
          <h1 className="mt-2 text-5xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Let&apos;s Build The Next Snack Drop</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#4d4d4d]">
            Collaborations, retail onboarding, bulk orders, media features, or just snack love.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <form className="rounded-3xl border border-[#00000012] bg-white p-6 shadow-[0_14px_30px_rgba(22,22,22,0.06)]">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Message The Team</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-[#333]">
                Name
                <input className="mt-2 w-full rounded-xl border border-[#0000001f] bg-[#fffaf4] px-4 py-3 text-[#1f1f1f] outline-none focus:border-[#ff7a00]" type="text" placeholder="Your name" />
              </label>
              <label className="text-sm font-semibold text-[#333]">
                Email
                <input className="mt-2 w-full rounded-xl border border-[#0000001f] bg-[#fffaf4] px-4 py-3 text-[#1f1f1f] outline-none focus:border-[#ff7a00]" type="email" placeholder="you@email.com" />
              </label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-[#333]">
              Subject
              <input className="mt-2 w-full rounded-xl border border-[#0000001f] bg-[#fffaf4] px-4 py-3 text-[#1f1f1f] outline-none focus:border-[#ff7a00]" type="text" placeholder="How can we help?" />
            </label>
            <label className="mt-4 block text-sm font-semibold text-[#333]">
              Message
              <textarea className="mt-2 h-36 w-full rounded-xl border border-[#0000001f] bg-[#fffaf4] px-4 py-3 text-[#1f1f1f] outline-none focus:border-[#ff7a00]" placeholder="Tell us more..." />
            </label>
            <button type="button" className="mt-5 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff3d81] px-7 py-3 text-sm font-black uppercase tracking-wide text-white">
              Send Message
            </button>
          </form>

          <div className="space-y-5">
            <div className="rounded-3xl border border-[#00000012] bg-white p-6">
              <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Reach Us</h2>
              <div className="mt-4 space-y-3 text-sm text-[#555]">
                <p><span className="font-black text-[#1f1f1f]">Email:</span> hello@roastedkart.com</p>
                <p><span className="font-black text-[#1f1f1f]">Phone:</span> +91 98765 43210</p>
                <p><span className="font-black text-[#1f1f1f]">Hours:</span> Mon - Sat, 10:00 AM - 6:00 PM</p>
                <p><span className="font-black text-[#1f1f1f]">Address:</span> Bengaluru, Karnataka, India</p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#00000012] bg-[#fff2e0] p-6">
              <h2 className="text-2xl font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">Follow The Chaos</h2>
              <div className="mt-4 space-y-3">
                {social.map((item) => (
                  <motion.div key={item.label} whileHover={{ y: -3 }} className="rounded-xl border border-[#00000012] bg-white p-3">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[#ff6b00]">{item.label}</p>
                    <p className="text-sm text-[#333]">{item.handle}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
