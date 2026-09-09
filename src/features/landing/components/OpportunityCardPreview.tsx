export function OpportunityCardPreview() {
  return (
    <div className="w-72 rounded-2xl border border-white/10 bg-white p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-dark">
          Agriculture
        </span>
        <span className="font-mono text-xs text-slate-400">12j restants</span>
      </div>

      <h3 className="mt-3 font-display text-base font-semibold text-primary">
        Subvention Agritech Sénégal
      </h3>

      <div className="mt-4 flex items-center gap-2">
        <div className="h-2 flex-1 rounded-full bg-slate-100">
          <div className="h-2 w-[92%] rounded-full bg-accent" />
        </div>
        <span className="font-mono text-sm font-semibold text-primary">92%</span>
      </div>
      <p className="mt-1 text-xs text-slate-400">de correspondance avec votre profil</p>

      <button className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-white transition hover:bg-primary-light">
        Voir l'opportunité →
      </button>
    </div>
  );
}