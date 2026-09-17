import type { CSSProperties } from "react";

interface ScatteredFragmentProps {
  label: string;
  source: string;
  className?: string;
  style?: CSSProperties;
}

export function ScatteredFragment({ label, source, className = "", style }: ScatteredFragmentProps) {
  return (
    <div
      style={style}
      className={`animate-float absolute w-40 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm ${className}`}
    >
      <p className="text-[10px] uppercase tracking-wide text-white/30">{source}</p>
      <p className="mt-1 text-xs text-white/50">{label}</p>
    </div>
  );
}