// src/features/assistant/components/AssistantChatBox.tsx
import { useEffect, useRef, useState } from "react";
import {
  Send,
  Loader2,
  Copy,
  Check,
  Paperclip,
  Plus,
  PanelRightOpen,
  PanelRightClose,
  Sparkles,
} from "lucide-react";
import { useAssistantChat } from "../hooks/useAssistantChat";
import { TypewriterText } from "./TypewriterText";
import type { ChatContext } from "../types";

interface AssistantChatBoxProps {
  context?: ChatContext;
  conversationId?: string;
  placeholder?: string;
  initialMessage?: string;
  onConversationStart?: (conversationId: string) => void;
  onNewConversation?: () => void;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  compact?: boolean;
}

const SUGGESTIONS = [
  "Trouve-moi des opportunités correspondant à mon profil",
  "Quels documents me manquent pour être éligible ?",
  "Montre-moi l'état de mes candidatures en cours",
];

export function AssistantChatBox({
  context,
  conversationId,
  placeholder,
  initialMessage,
  onConversationStart,
  onNewConversation,
  onToggleSidebar,
  sidebarOpen = false,
  compact = false,
}: AssistantChatBoxProps) {
  const { messages, sending, loadingHistory, error, conversationId: activeId, send } =
    useAssistantChat({ context, conversationId });

  const [message, setMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const notifiedRef = useRef(false);
  const autoSentRef = useRef(false);

  useEffect(() => {
    if (activeId && !notifiedRef.current && !conversationId) {
      notifiedRef.current = true;
      onConversationStart?.(activeId);
    }
  }, [activeId, conversationId, onConversationStart]);

  const scrollToEnd = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const value = (text ?? message).trim();
    if (!value || sending) return;
    setMessage("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    await send(value);
  };

  // Envoie automatiquement le message initial reçu (ex: depuis le dashboard), une seule fois
  useEffect(() => {
    if (initialMessage && !autoSentRef.current) {
      autoSentRef.current = true;
      void handleSend(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleAutoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const copyToClipboard = (id: string, text: string) => {
    void navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const lastAssistantIndex = messages.reduce((last, m, i) => (m.role === "assistant" ? i : last), -1);
  const messageText = compact ? "text-[13px]" : "text-sm";
  const maxWidth = compact ? "max-w-2xl" : "max-w-3xl";

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden bg-white dark:bg-[#0A0E2E]">
      {/* ===== BARRE D'ACTIONS — fixe en haut ===== */}
      <div className="flex items-center justify-end gap-1.5 border-b border-slate-200 px-4 py-2.5 dark:border-white/10">
        {onNewConversation && (
          <button
            type="button"
            onClick={onNewConversation}
            title="Nouvelle conversation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/80"
          >
            <Plus size={16} />
          </button>
        )}

        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            title={sidebarOpen ? "Masquer les conversations" : "Afficher les conversations"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/80"
          >
            {sidebarOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
          </button>
        )}
      </div>

      {/* ===== FIL DE MESSAGES — seul élément scrollable ===== */}
      <div className="min-h-0 overflow-y-auto px-4 py-6">
        <div className={`mx-auto ${maxWidth} space-y-5`}>
          {loadingHistory ? (
            <div className="space-y-4">
              <div className="h-16 w-2/3 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
              <div className="ml-auto h-12 w-1/2 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 dark:bg-white/5">
                <Sparkles size={22} className="text-accent" strokeWidth={1.8} />
              </div>
              <p className="mt-4 font-display text-base font-semibold text-slate-700 dark:text-white/80">
                Comment puis-je vous aider ?
              </p>
              <p className="mt-1 max-w-xs text-sm text-slate-400 dark:text-white/40">
                Posez une question ou choisissez une suggestion ci-dessous.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((text) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => void handleSend(text)}
                    className="rounded-full border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent dark:border-white/10 dark:text-white/60 dark:hover:border-accent/40 dark:hover:bg-accent/10"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLastAssistant = i === lastAssistantIndex;
              const time = new Date(m.createdAt).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              if (isUser) {
                return (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[80%]">
                      <div className={`rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 ${messageText} leading-relaxed text-white dark:bg-accent`}>
                        {m.content}
                      </div>
                      <p className="mt-1 pr-1 text-right text-[10px] text-slate-400 dark:text-white/30">{time}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={m.id} className="flex gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/5 dark:bg-white/5">
                    <Sparkles size={13} className="text-accent" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50/60 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
                      <div className={`whitespace-pre-wrap ${messageText} leading-relaxed text-slate-700 dark:text-white/85`}>
                        {isLastAssistant ? (
                          <TypewriterText key={m.id} text={m.content} speed={15} onTick={scrollToEnd} />
                        ) : (
                          m.content
                        )}
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center gap-3 pl-1 text-[10px] text-slate-400 dark:text-white/30">
                      <span>{time}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(m.id, m.content)}
                        className="flex items-center gap-1 transition-colors hover:text-slate-600 dark:hover:text-white/70"
                      >
                        {copiedId === m.id ? <Check size={11} /> : <Copy size={11} />}
                        {copiedId === m.id ? "Copié" : "Copier"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {sending && (
            <div className="flex gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/5 dark:bg-white/5">
                <Sparkles size={13} className="text-accent" strokeWidth={2} />
              </div>
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/40">
                <Loader2 size={13} className="animate-spin" />
                L'assistant réfléchit...
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ===== INPUT — fixe en bas ===== */}
      <div className="border-t border-slate-200 px-4 py-3 dark:border-white/10">
        <div className={`mx-auto w-full ${maxWidth}`}>
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition-colors focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:focus-within:border-accent/50 dark:focus-within:ring-accent/10">
            <button
              type="button"
              title="Joindre un fichier"
              className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5 dark:hover:text-white/70"
            >
              <Paperclip size={15} />
            </button>

            <textarea
              ref={inputRef}
              rows={1}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleAutoResize(e.target);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder ?? "Posez votre question..."}
              className="min-w-0 flex-1 resize-none bg-transparent py-1.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-white/30"
            />

            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!message.trim() || sending}
              aria-label="Envoyer"
              className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </div>

          {!compact && (
            <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-white/30">
              L'assistant peut faire des erreurs. Vérifiez les informations importantes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}