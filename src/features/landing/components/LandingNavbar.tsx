import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";
import logo from "@/assets/logo.jpeg";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  orangeSoft: "#FDF0E6",
};

// 📋 Liens adaptés à Gaynaako
const links = [
  { label: "Opportunités", href: "#opportunites" },
  { label: "Organismes", href: "#organismes", hasDropdown: true },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Blog", href: "#blog", isNew: true },
];

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-lg">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 pl-2">
          <img
            src={logo}
            alt="Gaynaako"
            className="h-8 w-8 rounded-xl object-cover"
          />
          <span
            className="font-display text-base font-semibold"
            style={{ color: BRAND.navy }}
          >
            Gaynaako
          </span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
              {link.hasDropdown && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
              {link.isNew && (
                <span
                  className="ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase"
                  style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
                >
                  New
                </span>
              )}
            </a>
          ))}
        </div>

        {/* CTA desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <Link
              to="/login"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: BRAND.navy }}
            >
              Mon espace
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90 hover:shadow-lg"
                style={{
                  background: BRAND.orange,
                  boxShadow: `0 8px 20px -6px ${BRAND.orange}88`,
                }}
              >
                Créer mon compte
              </Link>
            </>
          )}
        </div>

        {/* Bouton mobile */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Menu mobile */}
      {isOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.isNew && (
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase"
                      style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
                    >
                      New
                    </span>
                  )}
                </span>
                {link.hasDropdown && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </a>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
              {isAuthenticated ? (
                <Link
                  to="/app/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full px-4 py-2.5 text-center text-sm font-semibold text-white"
                  style={{ background: BRAND.navy }}
                >
                  Mon espace
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full px-4 py-2.5 text-center text-sm font-semibold text-white"
                    style={{ background: BRAND.orange }}
                  >
                    Créer mon compte
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}