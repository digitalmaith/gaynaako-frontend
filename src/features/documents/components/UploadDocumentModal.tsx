// src/features/documents/components/UploadDocumentModal.tsx
import { useRef, useState } from "react";
import { X, UploadCloud, FileText } from "lucide-react";
import type { DocumentViewItem } from "../types";

interface UploadDocumentModalProps {
  item: DocumentViewItem;
  onClose: () => void;
  onSubmit: (libelle: string, file: File) => Promise<void>;
}

export function UploadDocumentModal({ item, onClose, onSubmit }: UploadDocumentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [libelle, setLibelle] = useState(item.label);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!file) return;
    setSubmitting(true);
    try {
      await onSubmit(libelle, file);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl dark:bg-[#0b0f2b]">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-slate-800 dark:text-white">
            {item.label}
          </h3>
          <button
            onClick={onClose}
            disabled={submitting}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 dark:text-white/40 dark:hover:bg-white/5"
          >
            <X size={16} />
          </button>
        </div>

        <label className="mt-4 block text-xs font-medium text-slate-500 dark:text-white/50">
          Libellé
        </label>
        <input
          type="text"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            const dropped = e.dataTransfer.files?.[0];
            if (dropped) setFile(dropped);
          }}
          onClick={() => inputRef.current?.click()}
          className={`mt-4 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
            dragActive
              ? "border-primary bg-primary/5 dark:border-accent dark:bg-accent/5"
              : "border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20"
          }`}
        >
          {file ? (
            <>
              <FileText size={22} className="text-accent" />
              <p className="text-sm font-medium text-slate-700 dark:text-white/80">{file.name}</p>
              <p className="text-xs text-slate-400 dark:text-white/40">
                {(file.size / 1024).toFixed(0)} Ko
              </p>
            </>
          ) : (
            <>
              <UploadCloud size={22} className="text-slate-400 dark:text-white/30" />
              <p className="text-sm text-slate-500 dark:text-white/50">
                Glissez un fichier ici ou cliquez pour parcourir
              </p>
              <p className="text-xs text-slate-400 dark:text-white/30">PDF, JPG, PNG — 10 Mo max</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:text-white/50 dark:hover:bg-white/5"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || submitting}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
}