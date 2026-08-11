import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      {/* Navbar/Sidebar à venir */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}