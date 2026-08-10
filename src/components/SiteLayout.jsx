import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logoImg from "../assets/Roasted Kart Logo.png";
import { storeLinks } from "../data/catalog";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/track-order", label: "Track Order" },
  { to: "/build-your-own", label: "Build Your Own" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function SiteLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-[#fff8ef] text-[#202020]">
      <div className="bg-[#1f1f1f] py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-[#ffd26f]">
        No fry. All fly. | Crunch that hits different | Snack smart. Snack loud.
      </div>

      <nav className="sticky top-0 z-50 border-b border-[#00000014] bg-[#fff8ef]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="RoastedKart" className="h-24 md:h-24 lg:h-36 w-auto object-contain" />
            <span className="text-lg md:text-2xl lg:text-3xl font-black tracking-wide text-[#2b2b2b] [font-family:'Space_Grotesk',sans-serif]">
              
            </span>
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0000001f] bg-white text-[#2b2b2b] md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className="hidden items-center gap-3 text-sm font-black uppercase md:flex md:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition hover:text-[#ff6b00] ${isActive ? "text-[#ff6b00]" : "text-[#2b2b2b]"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `rounded-full border border-[#0000001f] px-3 py-2 text-[11px] tracking-wide ${
                  isActive ? "bg-[#ff6b00] text-white" : "text-[#2b2b2b]"
                }`
              }
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </NavLink>
            <a href={storeLinks.amazon} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#ff6b00] px-3 py-2 text-[11px] tracking-wide text-white shadow-[0_8px_24px_rgba(255,107,0,0.28)]">
              Amazon
            </a>
          </div>
        </div>

        <div className={`${mobileMenuOpen ? "block" : "hidden"} border-t border-[#00000012] bg-[#fff8ef] px-4 pb-4 pt-2 md:hidden`}>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.08em] transition ${isActive ? "bg-[#ff6b00] text-white" : "bg-white text-[#2b2b2b] hover:bg-[#fff0e4]"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-center text-[11px] font-black uppercase tracking-wide transition ${
                  isActive ? "bg-[#ff6b00] text-white" : "bg-white text-[#2b2b2b] hover:bg-[#fff0e4]"
                }`
              }
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </NavLink>
            <a
              href={storeLinks.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-[#ff6b00] px-4 py-3 text-center text-[11px] font-black uppercase tracking-wide text-white"
            >
              Amazon
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-[#00000012] bg-[#fff6ed] px-4 py-16 text-[#2f2f2f] md:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(255,140,42,0.1)]">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2b2b2b]">Roasted Goodness</p>
              <p className="mt-3 text-sm leading-7 text-[#555]">Made with real roasted spices and premium ingredients for better crunch, better energy, and better taste.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(115,163,48,0.08)]">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2b2b2b]">Fast shipping</p>
              <p className="mt-3 text-sm leading-7 text-[#555]">Free shipping on ₹999+ orders and express dispatch for every snack bundle.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(62,124,196,0.08)]">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2b2b2b]">Quality assured</p>
              <p className="mt-3 text-sm leading-7 text-[#555]">FSSAI certified, batch-tested, and crafted in hygienic kitchens for safe snacking.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(37,211,102,0.08)]">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2b2b2b]">Secure checkout</p>
              <p className="mt-3 text-sm leading-7 text-[#555]">SSL secure, trusted payment partners, and simple returns when you need them.</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ffe6d4] bg-white p-8 shadow-[0_30px_90px_rgba(255,151,45,0.1)]">
            <div className="grid gap-10 xl:grid-cols-[1.8fr_1fr_1fr_1fr]">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <NavLink to="/">
                    <img src={logoImg} alt="RoastedKart" className="h-16 w-auto object-contain" />
                  </NavLink>
                  <div>
                    <NavLink to="/" className="text-xl font-black text-[#2b2b2b] [font-family:'Space_Grotesk',sans-serif]"></NavLink>
                    <p className="mt-1 text-sm text-[#5a5a5a]">Crunchy, clean, and crafted for every snack moment.</p>
                  </div>
                </div>
                <p className="max-w-md text-sm leading-7 text-[#4d4d4d]">
                  Direct-to-door flavour packs, nutritional balance, and reliable service for customers who shop snacks with purpose.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[#ffe8d8] bg-[#fff8f2] p-4 text-sm text-[#5f3e15]">
                    <p className="font-black uppercase tracking-[0.16em] text-[#a56b30]">GSTIN</p>
                    <p className="mt-2">08AFWPA0107K2ZH</p>
                  </div>
                  <div className="rounded-3xl border border-[#f9e2c8] bg-[#fff5e8] p-4 text-sm text-[#5f3e15]">
                    <p className="font-black uppercase tracking-[0.16em] text-[#a56b30]">FSSAI</p>
                    <p className="mt-2">12226026000420</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#2b2b2b]">Shop</h3>
                <div className="flex flex-col gap-3 text-sm text-[#4a4a4a]">
                  <NavLink to="/shop" className="transition hover:text-[#ff6b00]">Shop All</NavLink>
                  <NavLink to="/shop#best-sellers" className="transition hover:text-[#ff6b00]">Best Sellers</NavLink>
                  <NavLink to="/shop#new-arrivals" className="transition hover:text-[#ff6b00]">New Arrivals</NavLink>
                  <NavLink to="/shop#gift-sets" className="transition hover:text-[#ff6b00]">Gifting</NavLink>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#2b2b2b]">Policies</h3>
                <div className="flex flex-col gap-3 text-sm text-[#4a4a4a]">
                  <NavLink to="/privacy-policy" className="transition hover:text-[#ff6b00]">Privacy Policy</NavLink>
                  <NavLink to="/terms-conditions" className="transition hover:text-[#ff6b00]">Terms & Conditions</NavLink>
                  <NavLink to="/refund-cancellation-policy" className="transition hover:text-[#ff6b00]">Refund Policy</NavLink>
                  <NavLink to="/shipping-delivery-policy" className="transition hover:text-[#ff6b00]">Shipping Policy</NavLink>
                  <NavLink to="/faq" className="transition hover:text-[#ff6b00]">FAQs</NavLink>
                  <NavLink to="/track-order" className="transition hover:text-[#ff6b00]">Track Order</NavLink>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#2b2b2b]">Connect</h3>
                <div className="rounded-3xl border border-[#fff1df] bg-[#fff7f0] p-5 text-sm text-[#4d4d4d] shadow-sm">
                  <p className="font-black uppercase tracking-[0.16em] text-[#2b2b2b]">Customer care</p>
                  <p className="mt-3">Email <a href="mailto:dietfactoryindia@gmail.com" className="text-[#ff6b00]">dietfactoryindia@gmail.com</a></p>
                  <p>Phone <a href="tel:+917425049203" className="text-[#ff6b00]">+91 74250 49203</a></p>
                  <p className="mt-4 font-black uppercase tracking-[0.16em] text-[#2b2b2b]">Follow</p>
                  <div className="mt-2 flex flex-col gap-2 text-sm text-[#4a4a4a]">
                    <a href="https://www.instagram.com/roastedkart" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#ff6b00]">Instagram</a>
                  
                    <a href="https://www.linkedin.com/company/roastedkart" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#ff6b00]">LinkedIn</a>
                  </div>
                </div>
                <div className="rounded-3xl border border-[#f2dcc1] bg-[#fff4e8] p-5 text-sm text-[#4a4a4a] shadow-sm">
                  <p className="font-black uppercase tracking-[0.16em] text-[#2b2b2b]">Support</p>
                  <p className="mt-3 text-sm leading-6">Quick help and order updates through WhatsApp or email from 10am–6pm, Mon–Sat.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#ffe4cf] bg-[#fff6f0] p-6 shadow-[0_30px_80px_rgba(255,156,36,0.08)]">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-4">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2b2b2b]">Trusted by thousands</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl border border-[#ffe7d9] bg-[#fff5ec] p-4 text-center">
                    <p className="text-2xl font-black text-[#ff6b00]">10K+</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#896032]">Happy customers</p>
                  </div>
                  <div className="rounded-3xl border border-[#e9f2d4] bg-[#f6fbef] p-4 text-center">
                    <p className="text-2xl font-black text-[#5c8c26]">4.9/5</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#6f8145]">Average rating</p>
                  </div>
                  <div className="rounded-3xl border border-[#dde7fc] bg-[#eef5ff] p-4 text-center">
                    <p className="text-2xl font-black text-[#1f5fa2]">Fast</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#4c5f82]">Delivery & support</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#f8dfca] bg-[#fff3e7] p-4 text-center text-sm text-[#4f3c23]">
                  <p className="font-black uppercase tracking-[0.16em]">Payment partners</p>
                  <p className="mt-3">UPI, Card, Netbanking, Wallets</p>
                </div>
                <div className="rounded-3xl border border-[#e8ebf2] bg-[#f6f9ff] p-4 text-center text-sm text-[#3f4f6f]">
                  <p className="font-black uppercase tracking-[0.16em]">Certified quality</p>
                  <p className="mt-3">FSSAI approved | Hygienic processing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#ffe3d0] pt-4 text-xs text-[#6d6d6d] sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 RoastedKart. All rights reserved.</p>
            <p className="uppercase tracking-[0.14em] text-[#9a763e]">A Brand of Your Diet Factory</p>
          </div>
        </div>
      </footer>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917425049203?text=Hi%2C%20I%27d%20like%20to%20order%20from%20RoastedKart%20%F0%9F%A5%9C"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition hover:scale-110 hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)]"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
