import logo from "@/assets/logo.jpeg";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-7 w-7 rounded-lg",
  md: "h-8 w-8 rounded-xl",
  lg: "h-10 w-10 rounded-xl",
};

export function BrandLogo({ size = "md", className }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden",
        "ring-1 ring-slate-200/60 dark:ring-white/10",
        "shadow-[0_2px_8px_-2px_rgba(18,25,74,0.15)] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]",
        sizeMap[size],
        className
      )}
    >
      <img
        src={logo}
        alt="Gaynaako"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}