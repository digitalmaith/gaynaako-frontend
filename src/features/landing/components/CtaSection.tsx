import { Link } from "react-router-dom";
import { Reveal } from "@/shared/components/Reveal";

export function CtaSection() {
  return (
    <section className="bg-brand-gradient py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-white">
            Ne manquez plus une seule opportunité.
          </h2>
          <p className="mt-3 text-white/80">
            Créez votre profil gratuitement et recevez vos premières recommandations dès aujourd'hui.
          </p>
          <Link
            to="/register"
            className="mt-7 inline-block rounded-lg bg-white px-7 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
          >
            Créer un compte gratuit
          </Link>
        </Reveal>
      </div>
    </section>
  );
}