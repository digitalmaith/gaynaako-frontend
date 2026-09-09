// src/features/dashboard/components/DashboardLayout.tsx
import { type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  rightRail?: ReactNode;
}

export function DashboardLayout({ children, rightRail }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0E2E]">
      <TopBar />

      <div className="mx-auto flex max-w-[1400px]">
        <Sidebar />

        <main className="min-w-0 flex-1 px-4 py-8 lg:px-8">{children}</main>

        {rightRail && (
          <aside className="hidden w-80 shrink-0 space-y-5 border-l border-slate-200 px-5 py-8 dark:border-white/10 xl:block">
            {rightRail}
          </aside>
        )}
      </div>
    </div>
  );
}