// src/features/documents/components/DocumentViewerModal.tsx
import { X, Download, ExternalLink, FileWarning } from "lucide-react";
import type { UserDocument } from "../types";

interface DocumentViewerModalProps {
  document: UserDocument;
  onClose: () => void;
}

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} Mo` : `${(bytes / 1024).toFixed(0)} Ko`;
}

export function DocumentViewerModal({ document, onClose }: DocumentViewerModalProps) {
  const isPdf = document.mimeType === "application/pdf";
  const isImage = document.mimeType.startsWith("image/");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-[#0b0f2b]">
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-white/10">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
              {document.nomFichier}
            </p>
            <p className="text-xs text-slate-400 dark:text-white/40">
              {formatSize(document.tailleOctets)} ·{" "}
              {new Date(document.dateAjout).toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <a
              href={document.url}
              download={document.nomFichier}
              aria-label="Télécharger"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
            >
              <Download size={16} />
            </a>
            <a
              href={document.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Ouvrir dans un nouvel onglet"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
            >
              <ExternalLink size={16} />
            </a>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Aperçu */}
        <div className="flex-1 overflow-auto bg-slate-100 dark:bg-black/20">
          {isPdf && (
            <iframe
              src={document.url}
              title={document.nomFichier}
              className="h-full w-full"
            />
          )}

          {isImage && (
            <div className="flex h-full items-center justify-center p-4">
              <img
                src={document.url}
                alt={document.nomFichier}
                className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
              />
            </div>
          )}

          {!isPdf && !isImage && (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
              <FileWarning size={28} className="text-slate-400 dark:text-white/30" />
              <p className="text-sm text-slate-500 dark:text-white/50">
                L'aperçu n'est pas disponible pour ce type de fichier.
              </p>
              <a
                href={document.url}
                download={document.nomFichier}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light"
              >
                Télécharger le fichier
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}