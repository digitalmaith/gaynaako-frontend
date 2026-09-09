const secteurs = [
  "Agriculture", "Numérique", "Santé", "Éducation", "Énergie",
  "Environnement", "Commerce", "Industrie", "Tourisme", "Finance",
];

export function SectorTicker() {
  const items = [...secteurs, ...secteurs];

  return (
    <div className="overflow-hidden border-y border-slate-100 bg-white py-4">
      <div className="animate-marquee flex w-max gap-8">
        {items.map((secteur, i) => (
          <span key={i} className="whitespace-nowrap text-sm font-medium text-slate-400">
            {secteur}
          </span>
        ))}
      </div>
    </div>
  );
}