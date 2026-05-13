import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logoImg from "../assets/Roasted Kart Logo.png";
import { storeLinks } from "../data/catalog";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function SiteLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fff8ef] text-[#202020]">
      <div className="bg-[#1f1f1f] py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-[#ffd26f]">
        No fry. All fly. | Crunch that hits different | Snack smart. Snack loud.
      </div>

      <nav className="sticky top-0 z-50 border-b border-[#00000014] bg-[#fff8ef]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <NavLink to="/" className="flex items-center">
            <img src={logoImg} alt="RoastedKart" className="h-20 w-auto object-contain" />
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

            <a href={storeLinks.amazon} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#ff6b00] px-3 py-2 text-[11px] tracking-wide text-white shadow-[0_8px_24px_rgba(255,107,0,0.28)]">
              Amazon
            </a>
            <a href={storeLinks.flipkart} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#0000001f] bg-white px-3 py-2 text-[11px] tracking-wide text-[#2b2b2b]">
              Flipkart
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
            <a
              href={storeLinks.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-[#ff6b00] px-4 py-3 text-center text-[11px] font-black uppercase tracking-wide text-white"
            >
              Amazon
            </a>
            <a
              href={storeLinks.flipkart}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-[#0000001f] bg-white px-4 py-3 text-center text-[11px] font-black uppercase tracking-wide text-[#2b2b2b]"
            >
              Flipkart
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-[#00000012] bg-[#fff2e0] px-4 py-10 text-[#3a3a3a] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <NavLink to="/">
              <img src={logoImg} alt="RoastedKart" className="h-10 w-auto object-contain" />
            </NavLink>
            <p className="mt-2 text-sm text-[#5a5a5a]">Snack party energy with cleaner crunch macros.</p>
          </div>
          <div className="flex gap-5 text-xs font-black uppercase tracking-[0.12em] text-[#2b2b2b]">
            <NavLink to="/shop" className="hover:text-[#ff6b00]">Shop</NavLink>
            <NavLink to="/about" className="hover:text-[#ff6b00]">About</NavLink>
            <NavLink to="/contact" className="hover:text-[#ff6b00]">Contact</NavLink>
          </div>
          <p className="text-xs text-[#6d6d6d]">Copyright 2026 RoastedKart.</p>
        </div>
      </footer>
    </div>
  );
}
