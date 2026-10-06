// src/features/assistant/components/AssistantInputBar.tsx
import { useRef, useState } from "react";
import { Send, Loader2, Paperclip, Mic, Link2 } from "lucide-react";

interface AssistantInputBarProps {
  onSend: (message: string) => Promise<void> | void;
  sending?: boolean;
  placeholder?: string;
  compact?: boolean;
  disabled?: boolean;
}

export function AssistantInputBar({
  onSend,
  sending = false,
  placeholder,
  compact = false,
  disabled = false,
}: AssistantInputBarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!message.trim() || sending || disabled) return;
    const text = message;
    setMessage("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    await onSend(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleAutoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };

  return (
    <div className="shrink-0 border-t border-slate-200/70 bg-white px-4 py-3 dark:border-white/5 dark:bg-slate-950">
      <div className="mx-auto w-full">
        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition focus-within:border-[#1E2B7A]/30 focus-within:shadow-[0_4px_12px_rgba(30,43,122,0.08)] dark:border-white/10 dark:bg-slate-900">
          <textarea
            ref={inputRef}
            rows={1}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleAutoResize(e.target);
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              placeholder ??
              "Posez une question sur vos opportunités, documents ou candidatures..."
            }
            disabled={disabled}
            className="w-full resize-none bg-transparent px-1 py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:opacity-50 dark:text-white dark:placeholder:text-white/40"
          />

          <div className="flex items-center justify-between gap-2 pt-1.5">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                title="Joindre un fichier"
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5"
              >
                <Paperclip size={15} />
              </button>
              <button
                type="button"
                title="Message vocal"
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5"
              >
                <Mic size={15} />
              </button>
              {!compact && (
                <button
                  type="button"
                  className="ml-1 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                >
                  <Link2 size={11} />
                  Contexte : Dossier Synapse
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!message.trim() || sending || disabled}
              aria-label="Envoyer"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E87722] text-white shadow-sm transition hover:bg-[#d96a1a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sending ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </div>
        </div>

        {!compact && (
          <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-white/40">
            Gaynaako Assistant peut faire des erreurs. Vérifiez systématiquement
            les cahiers des charges officiels.
          </p>
        )}
      </div>
    </div>
  );
}