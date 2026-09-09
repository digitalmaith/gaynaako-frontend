import { Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

export function LandingFooter() {
  return (
    <footer className="bg-primary-dark py-12 text-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="Gaynaako" className="h-8 w-8" />
              <span className="font-display font-semibold text-white">Gaynaako</span>
            </div>
            <p className="mt-3 max-w-xs text-sm">
              L'agent d'opportunités qui centralise, analyse et recommande.
            </p>
          </div>

          <div className="flex gap-16 text-sm">
            <div>
              <p className="font-medium text-white">Produit</p>
              <ul className="mt-3 space-y-2">
                <li><a href="#fonctionnalites" className="hover:text-white">Fonctionnalités</a></li>
                <li><a href="#comment-ca-marche" className="hover:text-white">Comment ça marche</a></li>
                <li><a href="#pour-qui" className="hover:text-white">Pour qui</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white">Contact</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center gap-1.5"><Phone size={14} /> +221 77 674 66 49</li>
                <li className="flex items-center gap-1.5"><Mail size={14} /> contact@gaynaakoit.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs">
          © {new Date().getFullYear()} Gaynaako Opportunity Agent. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}