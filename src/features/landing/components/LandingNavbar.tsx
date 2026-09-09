import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";
import logo from "@/assets/logo.jpeg";

const links = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Pour qui", href: "#pour-qui" },
];

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-primary-dark/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Gaynaako" className="h-9 w-9" />
          <span className="font-display text-lg font-semibold text-white">Gaynaako</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 md:flex">
          {links.map((link) => (
            <a href={link.href} key={link.href} className="rounded-full px-4 py-1.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <button className="text-white md:hidden" onClick={() => setIsOpen((o) => !o)} aria-label="Menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-primary-dark px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-white/80"
              >
                {link.label}
              </a>
            ))}
            <div className="hidden items-center gap-3 md:flex">
  {isAuthenticated ? (
    <Link
      to="/profile"
      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary-dark transition hover:bg-white/90"
    >
      Mon espace
    </Link>
  ) : (
    <>
      <Link
        to="/login"
        className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
      >
        Se connecter
      </Link>
      <Link
        to="/register"
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary-dark transition hover:bg-white/90"
      >
        Commencer
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