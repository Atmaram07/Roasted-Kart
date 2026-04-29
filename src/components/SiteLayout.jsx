import { NavLink, Outlet } from "react-router-dom";
import { storeLinks } from "../data/catalog";
import { useCart } from "../context/CartContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/cart", label: "Cart" },
];

export default function SiteLayout() {
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-[#fff8ef] text-[#202020]">
      <div className="bg-[#1f1f1f] py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-[#ffd26f]">
        No fry. All fly. | Crunch that hits different | Snack smart. Snack loud.
      </div>

      <nav className="sticky top-0 z-50 border-b border-[#00000014] bg-[#fff8ef]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <NavLink to="/" className="text-2xl font-black uppercase tracking-tight [font-family:'Space_Grotesk',sans-serif]">
            <span className="text-[#ff7a00]">Roasted</span>Kart
          </NavLink>

          <div className="flex items-center gap-3 text-sm font-black uppercase md:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition hover:text-[#ff6b00] ${isActive ? "text-[#ff6b00]" : "text-[#2b2b2b]"}`
                }
              >
                {item.label}
                {item.to === "/cart" ? ` (${count})` : ""}
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
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-[#00000012] bg-[#fff2e0] px-4 py-10 text-[#3a3a3a] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-black uppercase text-[#1f1f1f] [font-family:'Space_Grotesk',sans-serif]">RoastedKart</p>
            <p className="mt-1 text-sm text-[#5a5a5a]">Snack party energy with cleaner crunch macros.</p>
          </div>
          <div className="flex gap-5 text-xs font-black uppercase tracking-[0.12em] text-[#2b2b2b]">
            <NavLink to="/shop" className="hover:text-[#ff6b00]">Shop</NavLink>
            <NavLink to="/about" className="hover:text-[#ff6b00]">About</NavLink>
            <NavLink to="/contact" className="hover:text-[#ff6b00]">Contact</NavLink>
            <NavLink to="/cart" className="hover:text-[#ff6b00]">Cart</NavLink>
          </div>
          <p className="text-xs text-[#6d6d6d]">Copyright 2026 RoastedKart.</p>
        </div>
      </footer>
    </div>
  );
}
