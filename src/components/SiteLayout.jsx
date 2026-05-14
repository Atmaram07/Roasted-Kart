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
              <img src={logoImg} alt="RoastedKart" className="h-16 w-auto object-contain" />
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
