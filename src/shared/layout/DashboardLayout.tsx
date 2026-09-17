// src/features/dashboard/components/DashboardLayout.tsx
import { useState, type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { MobileBottomNav } from "./MobileBottomNav";

interface DashboardLayoutProps {
  children: ReactNode;
  rightRail?: ReactNode;
}

export function DashboardLayout({ children, rightRail }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0E2E]">
      {/* Header fixe, pleine largeur */}
      <TopBar />

      {/* Sidebar fixe — visible à partir de lg */}
      <Sidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c) => !c)} />

      {/* Contenu — décalé pour laisser la place au header + à la sidebar */}
      <div
        className={`pb-16 pt-16 transition-[padding] duration-200 lg:pb-0 ${
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px]">
          <main className="min-w-0 flex-1 px-4 py-8 lg:px-8">{children}</main>

          {rightRail && (
            <aside className="hidden w-80 shrink-0 space-y-5 border-l border-slate-200 px-5 py-8 dark:border-white/10 xl:block">
              {rightRail}
            </aside>
          )}
        </div>
      </div>

      {/* Nav mobile — visible en dessous de lg */}
      <MobileBottomNav />
    </div>
  );
}