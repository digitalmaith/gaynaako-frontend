import { DashboardLayout } from "@/shared/layout/DashboardLayout";

export default function AdminPage() {
    
    
  
  return (
    <DashboardLayout>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Bienvenue sur le tableau de bord administrateur. Sélectionnez une section pour gérer les utilisateurs, les opportunités et les logs.</p>
    </div>

    </DashboardLayout>
  );
}