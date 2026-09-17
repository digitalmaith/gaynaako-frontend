import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

// 🎨 Palette
const BRAND = {
  navy: "#1E2B7A",
  navyDark: "#141F5C",
  orange: "#E87722",
};

// 🔗 Icônes de marques en SVG local
// (LinkedIn et X ne sont plus disponibles dans react-simple-icons / lucide-react)

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const productLinks = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Pour qui", href: "#pour-qui" },
  { label: "Assistant IA", href: "#assistant" },
];

const resourceLinks = [
  { label: "Blog", href: "#blog" },
  { label: "Guide du financement", href: "#guide" },
  { label: "FAQ", href: "#faq" },
  { label: "Nous contacter", href: "#contact" },
];

const legalLinks = [
  { label: "Mentions légales", href: "#mentions" },
  { label: "Politique de confidentialité", href: "#confidentialite" },
  { label: "CGU", href: "#cgu" },
];

const socials = [
  { icon: LinkedInIcon, href: "#linkedin", label: "LinkedIn" },
  { icon: XIcon, href: "#twitter", label: "X (Twitter)" },
  { icon: SiFacebook, href: "#facebook", label: "Facebook" },
  { icon: SiInstagram, href: "#instagram", label: "Instagram" },
];

export function LandingFooter() {
  return (
    <footer
      className="relative overflow-hidden text-white/70"
      style={{ background: BRAND.navyDark }}
    >
      {/* Motif pointillé */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Orbe décoratif */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: `${BRAND.orange}22` }}
      />

      {/* Newsletter */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                Recevez les meilleures opportunités{" "}
                <span style={{ color: BRAND.orange }}>chaque semaine</span>
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Un email, les financements et appels d'offres qui comptent.
                Zéro spam.
              </p>
            </div>

            <form
              className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5 backdrop-blur-sm transition focus-within:border-white/30"
              onSubmit={(e) => e.preventDefault()}
            >
              <Mail size={16} className="shrink-0 text-white/40" />
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold text-white transition hover:opacity-90"
                style={{ background: BRAND.orange }}
              >
                S'abonner
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Section principale */}
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Logo + description + socials */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="Gaynaako"
                className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/10"
              />
              <span className="font-display text-lg font-semibold text-white">
                Gaynaako
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              L'agent d'opportunités qui centralise, analyse et recommande les
              meilleurs financements au Sénégal.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-transparent hover:text-white"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BRAND.orange;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Produit */}
          <div>
            <h4 className="text-sm font-semibold text-white">Produit</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-sm font-semibold text-white">Ressources</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="mt-0.5 shrink-0" style={{ color: BRAND.orange }} />
                <a href="tel:+221776746649" className="text-white/60 transition hover:text-white">
                  +221 77 674 66 49
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: BRAND.orange }} />
                <a
                  href="mailto:contact@gaynaakoit.com"
                  className="break-all text-white/60 transition hover:text-white"
                >
                  contact@gaynaakoit.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: BRAND.orange }} />
                <span className="text-white/60">Dakar, Sénégal 🇸🇳</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bandeau bas */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs md:flex-row">
          <p className="text-white/50">
            © {new Date().getFullYear()} Gaynaako Opportunity Agent. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-white/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Tous les services sont opérationnels
          </div>
        </div>
      </div>
    </footer>
  );
}