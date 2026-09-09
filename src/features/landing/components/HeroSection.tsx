import { AnimatedHeroStage } from "./AnimatedHeroStage";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-dark pb-20 pt-40">
      {/* Halo radial derrière le contenu */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_bottom,rgba(242,106,27,0.28),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <AnimatedHeroStage />
      </div>
    </section>
  );
}