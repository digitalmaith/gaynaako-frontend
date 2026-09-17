interface MatchScoreRingProps {
  score: number; // 0-100
  size?: number;
}

export function MatchScoreRing({ score, size = 88 }: MatchScoreRingProps) {
  const angle = (score / 100) * 360;

  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(var(--color-accent) ${angle}deg, rgba(255,255,255,0.15) ${angle}deg)`,
      }}
    >
      <div className="flex h-[76%] w-[76%] flex-col items-center justify-center rounded-full bg-primary-dark">
        <span className="font-display text-xl font-semibold text-white">
          {score}%
        </span>
        <span className="text-[10px] uppercase tracking-wide text-white/50">
          match
        </span>
      </div>
    </div>
  );
}