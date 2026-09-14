// src/features/documents/pages/DocumentsPage.tsx
import { useMemo, useState } from "react";
import { Search, ShieldCheck, AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/shared/layout/DashboardLayout";
import { DocumentRow, DocumentRowSkeleton } from "../components/DocumentRow";
import { UploadDocumentModal } from "../components/UploadDocumentModal";
import { DocumentViewerModal } from "../components/DocumentViewerModal";
import { ExpiredDocumentsBanner } from "../components/ExpiredDocumentsBanner";
import { documentStatusStyles } from "../documentStatus";
import { useDocuments } from "../hooks/useDocuments";
import type { DocumentViewItem, DocumentViewStatus, UserDocument } from "../types";

type FilterKey = "tous" | DocumentViewStatus;

const filters: { key: FilterKey; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "fourni", label: documentStatusStyles.fourni.label },
  { key: "bientot_expire", label: documentStatusStyles.bientot_expire.label },
  { key: "expire", label: documentStatusStyles.expire.label },
  { key: "non_fourni", label: documentStatusStyles.non_fourni.label },
];

export default function DocumentsPage() {
  const {
    items,
    expiredItems,
    loading,
    error,
    refetch,
    uploadDocument,
    removeDocument,
    getFreshDocument,
  } = useDocuments();

  const [activeFilter, setActiveFilter] = useState<FilterKey>("tous");
  const [search, setSearch] = useState("");
  const [uploadTarget, setUploadTarget] = useState<DocumentViewItem | null>(null);
  const [viewTarget, setViewTarget] = useState<UserDocument | null>(null);
  const [viewLoading, setViewLoading] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter = activeFilter === "tous" || item.status === activeFilter;
      const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [items, activeFilter, search]);

  const compliant = items.filter(
    (item) => item.status === "fourni" || item.status === "bientot_expire"
  ).length;
  const total = items.length;
  const percent = total === 0 ? 0 : Math.round((compliant / total) * 100);

  const countFor = (key: FilterKey) =>
    key === "tous" ? items.length : items.filter((item) => item.status === key).length;

  const handleUpload = async (libelle: string, file: File, dateExpiration?: string) => {
    if (!uploadTarget) return;
    try {
      await uploadDocument(uploadTarget.type, libelle, file, dateExpiration);
      setUploadTarget(null);
    } catch {
      alert("L'envoi du document a échoué. Réessayez.");
    }
  };

  const handleDelete = async (item: DocumentViewItem) => {
    if (!item.document) return;
    if (!confirm(`Supprimer "${item.label}" ?`)) return;
    try {
      await removeDocument(item.document.id);
    } catch {
      alert("La suppression a échoué. Réessayez.");
    }
  };

  const handleView = async (item: DocumentViewItem) => {
    if (!item.document) return;
    setViewLoading(true);
    try {
      const fresh = await getFreshDocument(item.document.id);
      setViewTarget(fresh ?? item.document);
    } catch {
      setViewTarget(item.document); // repli sur l'URL déjà connue si le refresh échoue
    } finally {
      setViewLoading(false);
    }
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

        {!loading && !error && (
          <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 dark:border-white/10">
            <ShieldCheck size={15} className="text-accent" />
            <span className="text-sm font-medium text-slate-700 dark:text-white/80">
              {compliant}/{total} conformes
            </span>
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}
      </div>

      {!loading && !error && <ExpiredDocumentsBanner items={expiredItems} />}

      {error ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 py-10 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <AlertCircle size={22} className="text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={refetch}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
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

          <div className="mt-2 rounded-xl border border-slate-200 px-4 dark:border-white/10">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <DocumentRowSkeleton key={i} />)
            ) : filteredItems.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-400 dark:text-white/40">
                Aucun document ne correspond à ce filtre.
              </p>
            ) : (
              filteredItems.map((item) => (
                <DocumentRow
                  key={item.type}
                  item={item}
                  onUpload={setUploadTarget}
                  onDelete={handleDelete}
                  onView={handleView}
                  viewLoading={viewLoading}
                />
              ))
            )}
          </div>
        </>
      )}

      {uploadTarget && (
        <UploadDocumentModal
          item={uploadTarget}
          onClose={() => setUploadTarget(null)}
          onSubmit={handleUpload}
        />
      )}

      {viewTarget && (
        <DocumentViewerModal document={viewTarget} onClose={() => setViewTarget(null)} />
      )}
    </DashboardLayout>
  );
}