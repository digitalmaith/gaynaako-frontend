import { FileText, Download, Trash2, Plus, FolderOpen } from 'lucide-react';
import type { UserDocument } from '../../types';

interface DocumentsSectionProps {
  documents: UserDocument[];
  onDelete?: (id: string) => void;
  onAdd?: () => void;
}

export function DocumentsSection({ documents, onDelete, onAdd }: DocumentsSectionProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen size={18} className="text-accent" />
          <h2 className="font-display text-lg font-semibold text-slate-800 dark:text-white">
            Mes documents
          </h2>
        </div>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-accent-light hover:shadow-md"
          >
            <Plus size={14} /> Ajouter
          </button>
        )}
      </div>

      {documents.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-200 py-12 text-center dark:border-white/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 dark:bg-white/5">
            <FileText size={22} className="text-slate-300 dark:text-white/20" />
          </div>
          <p className="text-sm text-slate-400 dark:text-white/40">
            Aucun document pour le moment
          </p>
        </div>
      ) : (
        <ul className="mt-5 space-y-2.5">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="group flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all hover:border-accent/30 hover:bg-accent/5 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-slate-800">
                <FileText size={18} className="text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                  {doc.libelle}
                </p>
                <p className="text-xs text-slate-400 dark:text-white/40">
                  {doc.type} · {formatSize(doc.tailleOctets)}
                </p>
              </div>
              {doc.url && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white hover:text-accent dark:hover:bg-white/10"
                >
                  <Download size={16} />
                </a>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(doc.id)}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}