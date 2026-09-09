// src/features/dashboard/pages/DashboardPage.tsx

import { useEffect, useState } from "react";

import { DashboardLayout } from "../components/DashboardLayout";

import {
  OpportunityCard,
  OpportunityCardSkeleton,
  type Opportunity,
} from "../components/OpportunityCard";

import {
  ProfileCompletionCard,
  ProfileCompletionCardSkeleton,
} from "../components/ProfileCompletionCard";

import {
  UpcomingDeadlines,
  UpcomingDeadlinesSkeleton,
  type Deadline,
} from "../components/UpcomingDeadlines";

import {
  ApplicationsTracker,
  ApplicationsTrackerSkeleton,
  type Application,
} from "../components/ApplicationsTracker";

import {
  DocumentComplianceCard,
  DocumentComplianceCardSkeleton,
  type DocumentComplianceItem,
} from "../components/DocumentComplianceCard";

import { useAuthStore } from "@/features/auth/stores/auth.store";

// ⚠️ À remplacer par vos vrais appels API
// (React Query / dashboardService)

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [documents, setDocuments] = useState<DocumentComplianceItem[]>([]);

  const role = useAuthStore((state) => state.user?.role);

  useEffect(() => {
    const timer = setTimeout(() => {
      // ⚠️ À remplacer par la vraie réponse de l'API
      // de vérification documentaire

      setDocuments([
        {
          id: "1",
          label: "NINEA",
          detail: "Valide jusqu'au 20/01/2026",
          status: "valide",
        },
        {
          id: "2",
          label: "Quitus Fiscal",
          detail: "Valide jusqu'au 31/12/2025",
          status: "valide",
        },
        {
          id: "3",
          label: "Attestation Fiscale",
          detail: "Expiré depuis le 30/04/2026",
          status: "expire",
        },
        {
          id: "4",
          label: "Statuts Société",
          detail: "Document valide",
          status: "valide",
        },
        {
          id: "5",
          label: "RIB Certifié",
          detail: "Certifié par Bank of Africa",
          status: "valide",
        },
        {
          id: "6",
          label: "Business Plan",
          detail: "Signature non détectée",
          status: "avertissement",
        },
        {
          id: "7",
          label: "Attestation IPRES",
          detail: "Document non fourni",
          status: "non_fourni",
        },
        {
          id: "8",
          label: "Bilans Comptables",
          detail: "Document non fourni",
          status: "non_fourni",
        },
      ]);

      setOpportunities([
        {
          id: "1",
          title: "Fonds d'appui à l'entrepreneuriat féminin",
          bailleur: "PNUD Sénégal",
          lieu: "Dakar",
          echeance: "Dans 6 jours",
          score: 94,
        },
        {
          id: "2",
          title: "Concours Startup Africa 2026",
          bailleur: "AfDB",
          lieu: "Régional",
          echeance: "Dans 12 jours",
          score: 81,
        },
        {
          id: "3",
          title: "Subvention agro-transformation",
          bailleur: "USAID",
          lieu: "Thiès",
          echeance: "Dans 20 jours",
          score: 74,
        },
      ]);

      setDeadlines([
        {
          id: "1",
          title: "Fonds d'appui à l'entrepreneuriat féminin",
          date: "15 sept. 2026",
        },
        {
          id: "2",
          title: "Startup Africa 2026",
          date: "21 sept. 2026",
        },
      ]);

      setApplications([
        {
          id: "1",
          title: "Fonds PNUD",
          status: "en_cours",
        },
        {
          id: "2",
          title: "Subvention USAID",
          status: "a_examiner",
        },
      ]);

      setProfileCompletion(68);
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [role]);

  const [spotlight, ...rest] = opportunities;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Colonne principale */}
        <div className="space-y-6 lg:col-span-2">
          {loading ? (
            <>
              <OpportunityCardSkeleton spotlight />
              <OpportunityCardSkeleton />
              <OpportunityCardSkeleton />
            </>
          ) : (
            <>
              {spotlight && (
                <OpportunityCard
                  opportunity={spotlight}
                  spotlight
                />
              )}

              {rest.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                />
              ))}

              <ApplicationsTracker items={applications} />
            </>
          )}

          {loading && <ApplicationsTrackerSkeleton />}
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {loading ? (
            <>
              <ProfileCompletionCardSkeleton />
              <DocumentComplianceCardSkeleton />
              <UpcomingDeadlinesSkeleton />
            </>
          ) : (
            <>
              <ProfileCompletionCard percent={profileCompletion} />

              <DocumentComplianceCard
                documents={documents}
                onUpload={(id) => {
                  console.log("Upload document :", id);
                }}
              />

              <UpcomingDeadlines items={deadlines} />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}