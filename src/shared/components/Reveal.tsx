import type { ReactNode } from "react";
import { useInView } from "@/shared/hooks/useInView";

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}