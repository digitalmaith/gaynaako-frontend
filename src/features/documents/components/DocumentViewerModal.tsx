// src/features/documents/components/DocumentViewerModal.tsx
import { useEffect } from 'react';
import {
  X,
  Download,
  ExternalLink,
  FileWarning,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useDocumentBlob } from '../hooks/useDocumentBlob';
import { documentsService } from '../services/documents.service';
import type { UserDocument } from '../types';

interface DocumentViewerModalProps {
  doc: UserDocument;        // ⬅️ renommé de `document` à `doc`
  onClose: () => void;
}

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} Mo` : `${(bytes / 1024).toFixed(0)} Ko`;
}

export function DocumentViewerModal({ doc, onClose }: DocumentViewerModalProps) {
  const { blobUrl, mimeType, loading, error } = useDocumentBlob(doc.id);

  // Fermer avec Échap
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Bloquer le scroll du body (le `document` ici est le global du navigateur)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const isPdf = mimeType === 'application/pdf';
  const isImage = mimeType?.startsWith('image/');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-[#0b0f2b]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-white/10">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
              {doc.nomFichier}
            </p>
            <p className="text-xs text-slate-400 dark:text-white/40">
              {formatSize(doc.tailleOctets)} ·{' '}
              {new Date(doc.dateAjout).toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => documentsService.download(doc.id, doc.nomFichier)}
              aria-label="Télécharger"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
            >
              <Download size={16} />
            </button>

            {blobUrl && (
              <a
                href={blobUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Ouvrir dans un nouvel onglet"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
              >
                <ExternalLink size={16} />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Aperçu */}
        <div className="relative flex-1 overflow-auto bg-slate-100 dark:bg-black/20">
          {/* Loading */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Loader2 size={28} className="animate-spin text-accent" />
              <p className="text-sm text-slate-500 dark:text-white/50">
                Chargement du document...
              </p>
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
              <AlertCircle size={28} className="text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
              <button
                type="button"
                onClick={() => documentsService.download(doc.id, doc.nomFichier)}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light"
              >
                Télécharger directement
              </button>
            </div>
          )}

          {/* Contenu */}
          {!loading && !error && blobUrl && (
            <>
              {isPdf && (
                <iframe
                  src={blobUrl}
                  title={doc.nomFichier}
                  className="h-full w-full border-0"
                />
              )}

              {isImage && (
                <div className="flex h-full items-center justify-center p-4">
                  <img
                    src={blobUrl}
                    alt={doc.nomFichier}
                    className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
                  />
                </div>
              )}

              {!isPdf && !isImage && (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <FileWarning
                    size={28}
                    className="text-slate-400 dark:text-white/30"
                  />
                  <p className="text-sm text-slate-500 dark:text-white/50">
                    L'aperçu n'est pas disponible pour ce type de fichier.
                  </p>
                  <button
                    type="button"
                    onClick={() => documentsService.download(doc.id, doc.nomFichier)}
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light"
                  >
                    Télécharger le fichier
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}