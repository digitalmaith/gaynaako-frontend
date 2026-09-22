import { useState, type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { adminShortcuts, sectionLabels, userShortcuts } from "./navigation";
import { Role } from "@/features/auth/types/auth.types";
import { useAuthStore } from "@/app/store/authStore";

interface DashboardLayoutProps {
  children: ReactNode;
  rightRail?: ReactNode;
}

export function DashboardLayout({ children, rightRail }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const role = useAuthStore((s) => s.user?.role);

  const isAdmin = role === Role.ADMIN;

  const shortcuts = isAdmin ? adminShortcuts : userShortcuts;
  const sectionLabel = isAdmin ? sectionLabels.admin : sectionLabels.user;
  const settingsLink = isAdmin ? "/app/admin" : "/app/profile";

  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark">
      <TopBar />

      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        shortcuts={shortcuts}
        sectionLabel={sectionLabel}
        settingsLink={settingsLink}
      />

      <div
        className={`pb-16 pt-16 transition-[padding] duration-200 lg:pb-0 ${
          collapsed ? "lg:pl-18" : "lg:pl-64"
        }`}
      >
        <div className="mx-auto flex max-w-350">
          <main className="min-w-0 flex-1 px-4 py-8 lg:px-8">{children}</main>

          {rightRail && (
            <aside className="hidden w-80 shrink-0 space-y-5 border-l border-slate-200 px-5 py-8 dark:border-white/10 xl:block">
              {rightRail}
            </aside>
          )}
        </div>
      </div>

      {/* Nav mobile — visible en dessous de lg */}
      <MobileBottomNav shortcuts={shortcuts} />
    </div>
  );
}