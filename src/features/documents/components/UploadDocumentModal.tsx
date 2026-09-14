// src/features/documents/components/UploadDocumentModal.tsx
import { useRef, useState, useMemo } from "react";
import { X, UploadCloud, FileText, AlertCircle, CalendarX, CheckCircle2 } from "lucide-react";
import type { DocumentViewItem } from "../types";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  orangeSoft: "#FDF0E6",
  green: "#10B981",
  red: "#EF4444",
};

interface UploadDocumentModalProps {
  item: DocumentViewItem;
  onClose: () => void;
  onSubmit: (libelle: string, file: File, dateExpiration?: string) => Promise<void>;
}

export function UploadDocumentModal({ item, onClose, onSubmit }: UploadDocumentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [libelle, setLibelle] = useState(item.label);
  const [dateExpiration, setDateExpiration] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 📅 Aujourd'hui à minuit (pour comparaison fiable)
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // ✅ Vérifie si la date d'expiration est dans le passé
  const isDateExpired = useMemo(() => {
    if (!dateExpiration) return false;
    const d = new Date(dateExpiration);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }, [dateExpiration, today]);

  // ✅ Vérifie si la date est aujourd'hui
  const isDateToday = useMemo(() => {
    if (!dateExpiration) return false;
    const d = new Date(dateExpiration);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  }, [dateExpiration, today]);

  // 🚫 Le formulaire est-il valide ?
  const canSubmit =
    !!file && !fileError && !isDateExpired && !!libelle.trim() && !submitting;

  // 📄 Gestion du fichier (uniquement PDF)
  const handleFile = (f: File | null) => {
    setFileError(null);

    if (!f) {
      setFile(null);
      return;
    }

    // Vérification du type MIME + extension
    const isPdf =
      f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setFile(null);
      setFileError("Seuls les fichiers PDF sont acceptés.");
      return;
    }

    // Vérification de la taille (10 Mo max)
    if (f.size > 10 * 1024 * 1024) {
      setFile(null);
      setFileError("Le fichier dépasse 10 Mo.");
      return;
    }

    setFile(f);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit(libelle, file!, dateExpiration || undefined);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#0b0f2b]">
        
        {/* ===== EN-TÊTE ===== */}
        <div
          className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-white/5"
          style={{
            background: `linear-gradient(135deg, ${BRAND.navy}08, ${BRAND.orange}08)`,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.orange})` }}
            >
              <FileText size={16} />
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-800 dark:text-white">
                {item.label}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-white/50">
                {item.document ? "Remplacer le document" : "Ajouter un document"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5"
          >
            <X size={16} />
          </button>
        </div>

        {/* ===== CORPS ===== */}
        <div className="p-5">
          
          {/* Libellé */}
          <label className="block text-xs font-semibold text-slate-600 dark:text-white/60">
            Libellé
          </label>
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30"
            style={{ "--tw-ring-color": `${BRAND.orange}55` } as React.CSSProperties}
          />

          {/* Date d'expiration */}
          <label className="mt-4 block text-xs font-semibold text-slate-600 dark:text-white/60">
            Date d'expiration <span className="font-normal text-slate-400 dark:text-white/30">(optionnel)</span>
          </label>
          <input
            type="date"
            value={dateExpiration}
            onChange={(e) => setDateExpiration(e.target.value)}
            className="mt-1.5 w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:ring-2 dark:bg-white/5 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
            style={{
              borderColor: isDateExpired ? BRAND.red : undefined,
              "--tw-ring-color": isDateExpired ? `${BRAND.red}55` : `${BRAND.orange}55`,
            } as React.CSSProperties}
          />

          {/* ⚠️ Message d'erreur : date expirée */}
          {isDateExpired && (
            <div
              className="mt-2 flex items-start gap-2 rounded-xl border px-3 py-2 text-xs"
              style={{
                background: `${BRAND.red}10`,
                borderColor: `${BRAND.red}44`,
                color: BRAND.red,
              }}
            >
              <CalendarX size={14} className="mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">Cette date est déjà passée</p>
                <p className="mt-0.5 text-[11px] opacity-80">
                  Veuillez saisir une date d'expiration future (aujourd'hui ou plus tard).
                </p>
              </div>
            </div>
          )}

          {/* ⚠️ Avertissement : expire aujourd'hui */}
          {isDateToday && !isDateExpired && (
            <div
              className="mt-2 flex items-start gap-2 rounded-xl border px-3 py-2 text-xs"
              style={{
                background: `${BRAND.orange}10`,
                borderColor: `${BRAND.orange}44`,
                color: BRAND.orange,
              }}
            >
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">Expire aujourd'hui</p>
                <p className="mt-0.5 text-[11px] opacity-80">
                  Ce document sera marqué comme expiré dès demain.
                </p>
              </div>
            </div>
          )}

          {/* ✅ Confirmation : date valide */}
          {dateExpiration && !isDateExpired && !isDateToday && (
            <div
              className="mt-2 flex items-center gap-2 rounded-xl border px-3 py-2 text-xs"
              style={{
                background: `${BRAND.green}10`,
                borderColor: `${BRAND.green}44`,
                color: BRAND.green,
              }}
            >
              <CheckCircle2 size={14} className="shrink-0" />
              <span className="font-medium">
                Expire le{" "}
                {new Date(dateExpiration).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {/* Zone de dépôt */}
          <label className="mt-4 block text-xs font-semibold text-slate-600 dark:text-white/60">
            Fichier PDF
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFile(e.dataTransfer.files?.[0] ?? null);
            }}
            onClick={() => inputRef.current?.click()}
            className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-all"
            style={{
              borderColor: dragActive
                ? BRAND.orange
                : fileError
                ? BRAND.red
                : undefined,
              background: dragActive
                ? `${BRAND.orange}08`
                : fileError
                ? `${BRAND.red}08`
                : undefined,
            }}
          >
            {file ? (
              <>
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
                >
                  <FileText size={22} />
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-white/80">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400 dark:text-white/40">
                  {(file.size / 1024).toFixed(0)} Ko
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setFileError(null);
                  }}
                  className="mt-1 text-[11px] font-medium text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline dark:text-white/50"
                >
                  Changer de fichier
                </button>
              </>
            ) : (
              <>
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: fileError ? `${BRAND.red}15` : "#F1F5F9",
                    color: fileError ? BRAND.red : "#94A3B8",
                  }}
                >
                  <UploadCloud size={22} />
                </div>
                <p className="text-sm text-slate-600 dark:text-white/60">
                  Glissez votre PDF ici ou{" "}
                  <span style={{ color: BRAND.orange }} className="font-semibold">
                    parcourez
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 dark:text-white/30">
                  Format accepté : PDF uniquement · 10 Mo max
                </p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* ⚠️ Message d'erreur fichier */}
          {fileError && (
            <div
              className="mt-2 flex items-start gap-2 rounded-xl border px-3 py-2 text-xs"
              style={{
                background: `${BRAND.red}10`,
                borderColor: `${BRAND.red}44`,
                color: BRAND.red,
              }}
            >
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span className="font-medium">{fileError}</span>
            </div>
          )}
        </div>

        {/* ===== PIED ===== */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3 dark:border-white/5 dark:bg-white/5">
          <p className="text-[11px] text-slate-400 dark:text-white/40">
            {canSubmit ? "Prêt à envoyer" : "Complétez le formulaire"}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:text-white/50 dark:hover:bg-white/10"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: BRAND.orange }}
            >
              {submitting ? (
                <>
                  <svg
                    className="h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Envoi...
                </>
              ) : (
                "Envoyer"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}