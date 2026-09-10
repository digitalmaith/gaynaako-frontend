import { useEffect, useMemo, useState } from "react";
import { Search, ShieldCheck } from "lucide-react";
import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { DocumentRow, DocumentRowSkeleton } from "../components/DocumentRow";
import { UploadDocumentModal } from "../components/UploadDocumentModal";
import { documentStatusStyles, type DocumentStatus } from "../documentStatus";
import type { DocumentEntry } from "../types";

type FilterKey = "tous" | DocumentStatus;

const filters: { key: FilterKey; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "valide", label: documentStatusStyles.valide.label },
  { key: "expire", label: documentStatusStyles.expire.label },
  { key: "avertissement", label: documentStatusStyles.avertissement.label },
  { key: "non_fourni", label: documentStatusStyles.non_fourni.label },
];

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("tous");
  const [search, setSearch] = useState("");
  const [uploadTarget, setUploadTarget] = useState<DocumentEntry | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // ⚠️ à remplacer par la vraie réponse de l'API de vérification documentaire
      setDocuments([
        { id: "1", label: "NINEA", detail: "Numéro d'identification nationale", status: "valide", updatedAt: "20/01/2025" },
        { id: "2", label: "Quitus Fiscal", detail: "Délivré par la Direction des Impôts", status: "valide", updatedAt: "31/12/2024" },
        { id: "3", label: "Attestation Fiscale", detail: "Expiré depuis le 30/04/2026", status: "expire", updatedAt: "30/04/2025" },
        { id: "4", label: "Statuts Société", detail: "Document constitutif", status: "valide", updatedAt: "12/03/2024" },
        { id: "5", label: "RIB Certifié", detail: "Certifié par Bank of Africa", status: "valide", updatedAt: "05/02/2025" },
        { id: "6", label: "Business Plan", detail: "Signature non détectée", status: "avertissement", updatedAt: "18/06/2026" },
        { id: "7", label: "Attestation IPRES", detail: "Document non fourni", status: "non_fourni" },
        { id: "8", label: "Bilans Comptables", detail: "Document non fourni", status: "non_fourni" },
      ]);
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesFilter = activeFilter === "tous" || doc.status === activeFilter;
      const matchesSearch = doc.label.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [documents, activeFilter, search]);

  const compliant = documents.filter((doc) => doc.status === "valide").length;
  const total = documents.length;
  const percent = total === 0 ? 0 : Math.round((compliant / total) * 100);

  const countFor = (key: FilterKey) =>
    key === "tous" ? documents.length : documents.filter((doc) => doc.status === key).length;

  const handleUploaded = (documentId: string, file: File) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? { ...doc, status: "avertissement", detail: `${file.name} — en cours de vérification` }
          : doc
      )
    );
    setUploadTarget(null);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-slate-800 dark:text-white">
            Documents
          </h1>
          <p className="mt-1 text-sm text-slate-400 dark:text-white/40">
            Gérez les pièces justificatives de votre dossier de candidature.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 dark:border-white/10">
          <ShieldCheck size={15} className="text-accent" />
          <span className="text-sm font-medium text-slate-700 dark:text-white/80">
            {compliant}/{total} conformes
          </span>
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
            <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === filter.key
                ? "bg-primary/5 text-primary dark:bg-white/10 dark:text-white"
                : "text-slate-500 hover:bg-slate-50 dark:text-white/40 dark:hover:bg-white/5"
            }`}
          >
            {filter.label}
            <span className="text-xs text-slate-400 dark:text-white/30">
              {countFor(filter.key)}
            </span>
          </button>
        ))}

        <div className="relative ml-auto w-full max-w-xs">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un document..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30"
          />
        </div>
      </div>

      {/* Liste */}
      <div className="mt-2 rounded-xl border border-slate-200 px-4 dark:border-white/10">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <DocumentRowSkeleton key={i} />)
        ) : filteredDocuments.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400 dark:text-white/40">
            Aucun document ne correspond à ce filtre.
          </p>
        ) : (
          filteredDocuments.map((doc) => (
            <DocumentRow key={doc.id} document={doc} onAction={setUploadTarget} />
          ))
        )}
      </div>

      {uploadTarget && (
        <UploadDocumentModal
          document={uploadTarget}
          onClose={() => setUploadTarget(null)}
          onUploaded={handleUploaded}
        />
      )}
    </DashboardLayout>
  );
}