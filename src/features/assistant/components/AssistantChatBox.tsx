// src/features/assistant/components/AssistantChatBox.tsx
import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  Copy,
  Check,
  Mic,
  Plus,
  ArrowUp,
} from "lucide-react";
import { useAssistantChat } from "../hooks/useAssistantChat";
import { TypewriterText, renderMarkdown } from "./TypewriterText";
import { BrandLogo } from "@/shared/components/BrandLogo";
import type { ChatContext } from "../types";

interface AssistantChatBoxProps {
  context?: ChatContext;
  conversationId?: string;
  placeholder?: string;
  initialMessage?: string;
  onConversationStart?: (conversationId: string) => void;
  compact?: boolean;
}

const SUGGESTIONS = [
  { icon: "💰", text: "Opportunités pour mon profil" },
  { icon: "📄", text: "Documents manquants" },
  { icon: "📊", text: "Mes candidatures" },
  { icon: "🎯", text: "Conseils personnalisés" },
];

export function AssistantChatBox({
  context,
  conversationId,
  placeholder,
  initialMessage,
  onConversationStart,
  compact = false,
}: AssistantChatBoxProps) {
  const {
    messages,
    sending,
    loadingHistory,
    error,
    conversationId: activeId,
    send,
  } = useAssistantChat({ context, conversationId });

  const [message, setMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
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

  const scrollToEnd = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

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

  const lastAssistantIndex = messages.reduce(
    (last, m, i) => (m.role === "assistant" ? i : last),
    -1,
  );
  const maxWidth = compact ? "max-w-2xl" : "max-w-3xl";
  const isEmpty = !loadingHistory && messages.length === 0;

  /* ================================================================ */
  /*  INPUT BAR — pilule large style ZAY-G                            */
  /* ================================================================ */
  const inputBar = (
    <div className={`mx-auto w-full ${maxWidth}`}>
      <div
        className={`
          flex items-center gap-2 rounded-full border bg-white/80 p-1.5 pl-2
          backdrop-blur-xl transition-all duration-300
          dark:bg-white/[0.05]
          ${
            isFocused
              ? "border-accent/40 shadow-[0_8px_30px_-10px_rgba(242,106,27,0.35)] ring-4 ring-accent/5 dark:border-accent/50"
              : "border-slate-200/70 shadow-[0_4px_20px_-8px_rgba(18,25,74,0.12)] hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20"
          }
        `}
      >
        {/* Bouton + rond */}
        <button
          type="button"
          title="Joindre"
          className="
            flex h-9 w-9 shrink-0 items-center justify-center rounded-full
            text-slate-500 transition-all duration-200
            hover:bg-slate-100 hover:text-slate-700
            dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white/90
          "
        >
          <Plus size={18} strokeWidth={2.2} />
        </button>

        {/* Textarea */}
        <textarea
          ref={inputRef}
          rows={1}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleAutoResize(e.target);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder ?? "Écrivez votre message ici…"}
          className="
            min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-sm
            leading-relaxed text-slate-700 outline-none
            placeholder:text-slate-400/80
            dark:text-white dark:placeholder:text-white/30
          "
        />

        {/* Micro */}
        <button
          type="button"
          title="Message vocal"
          className="
            flex h-9 w-9 shrink-0 items-center justify-center rounded-full
            text-slate-500 transition-all duration-200
            hover:bg-slate-100 hover:text-slate-700
            dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white/90
          "
        >
          <Mic size={16} />
        </button>

        {/* Envoyer */}
        <button
          type="button"
          onClick={() => void handleSend()}
          disabled={!message.trim() || sending}
          aria-label="Envoyer"
          className="
            flex h-9 w-9 shrink-0 items-center justify-center rounded-full
            bg-primary text-white
            transition-all duration-200
            hover:bg-primary-light hover:scale-105 active:scale-95
            disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100
            dark:bg-accent dark:hover:bg-accent-light
          "
        >
          {sending ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <ArrowUp size={16} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {!compact && (
        <p className="mt-3 text-center text-[10px] tracking-wide text-slate-400/80 dark:text-white/25">
          L'assistant peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      )}
    </div>
  );

  /* ================================================================ */
  /*  EMPTY STATE — mascotte + suggestions pilules                    */
  /* ================================================================ */
  if (isEmpty) {
    return (
      <div className="flex h-full flex-col items-center justify-center overflow-hidden px-6">
        {/* Mascotte — logo Gaynaako */}
        <div className="relative mb-6 h-32 w-32">
          {/* Halo doux */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-accent-light/10 to-primary/10 blur-2xl" />
          {/* Logo */}
          <div className="relative flex h-full w-full items-center justify-center">
            <BrandLogo
              size="lg"
              className="h-24 w-24 rounded-[32px] shadow-[0_20px_50px_-15px_rgba(242,106,27,0.5)]"
            />
          </div>
          {/* Étincelles */}
          <div className="absolute -right-1 top-2 h-1.5 w-1.5 animate-pulse rounded-full bg-accent/70" />
          <div
            className="absolute -left-1 bottom-4 h-1 w-1 animate-pulse rounded-full bg-primary/50"
            style={{ animationDelay: "0.6s" }}
          />
          <div
            className="absolute right-4 -top-1 h-1 w-1 animate-pulse rounded-full bg-accent-light/60"
            style={{ animationDelay: "1.2s" }}
          />
        </div>

        {/* Titre */}
        <h1 className="text-center font-display text-2xl font-semibold leading-tight tracking-tight text-slate-800 dark:text-white sm:text-[32px]">
          Comment puis-je{" "}
          <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            vous aider
          </span>{" "}
          aujourd'hui&nbsp;?
        </h1>

        {/* Suggestions pilules */}
        <div className="mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
          {SUGGESTIONS.map(({ icon, text }) => (
            <button
              key={text}
              type="button"
              onClick={() => void handleSend(text)}
              className="
                flex items-center gap-2 rounded-full
                border border-slate-200/70 bg-white/70 px-4 py-2.5
                text-[13px] font-medium text-slate-600 backdrop-blur
                shadow-[0_2px_10px_-4px_rgba(18,25,74,0.08)]
                transition-all duration-200
                hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.04] hover:text-accent hover:shadow-md
                dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70
                dark:hover:border-accent/40 dark:hover:bg-accent/10 dark:hover:text-white
              "
            >
              <span className="text-base">{icon}</span>
              {text}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mt-10 w-full">{inputBar}</div>
      </div>
    );
  }

  /* ================================================================ */
  /*  CONVERSATION — bulles style ZAY-G                               */
  /* ================================================================ */
  return (
    <div className="grid h-full grid-rows-[1fr_auto] overflow-hidden">
      <div className="min-h-0 overflow-y-auto px-6 py-8">
        <div className={`mx-auto ${maxWidth} space-y-6`}>
          {loadingHistory ? (
            <div className="space-y-5">
              <div className="h-20 w-3/4 animate-pulse rounded-2xl bg-slate-100/80 dark:bg-white/5" />
              <div className="ml-auto h-14 w-1/2 animate-pulse rounded-2xl bg-slate-100/80 dark:bg-white/5" />
            </div>
          ) : (
            messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLastAssistant = i === lastAssistantIndex;
              const time = new Date(m.createdAt).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              /* ---------- USER : bulle dégradé primary ---------- */
              if (isUser) {
                return (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[75%]">
                      <div
                        className="
                          rounded-[22px] rounded-br-md px-4 py-3 text-[14px]
                          leading-relaxed text-white
                          bg-gradient-to-br from-primary to-primary-light
                          shadow-[0_8px_24px_-10px_rgba(18,25,74,0.4)]
                          dark:from-accent dark:to-accent-light
                          dark:shadow-[0_8px_24px_-10px_rgba(242,106,27,0.5)]
                        "
                      >
                        {m.content}
                      </div>
                      <p className="mt-1.5 pr-2 text-right text-[10px] font-medium text-slate-400 dark:text-white/30">
                        {time}
                      </p>
                    </div>
                  </div>
                );
              }

              /* ---------- ASSISTANT : bulle blanche translucide ---------- */
              return (
                <div key={m.id} className="group flex gap-3">
                  {/* Avatar — logo Gaynaako */}
                  <BrandLogo size="sm" />

                  <div className="min-w-0 flex-1">
                    <div
                      className="
                        rounded-[22px] rounded-tl-md
                        border border-slate-200/60 bg-white/80 px-4 py-3
                        shadow-[0_4px_16px_-8px_rgba(18,25,74,0.1)]
                        backdrop-blur-sm
                        dark:border-white/[0.08] dark:bg-white/[0.05]
                      "
                    >
                      <div className="text-[14px] leading-relaxed text-slate-700 dark:text-white/85">
                        {isLastAssistant && m.isNew ? (
                          <TypewriterText
                            key={m.id}
                            text={m.content}
                            speed={15}
                            onTick={scrollToEnd}
                          />
                        ) : (
                          <div
                            className="markdown-content"
                            dangerouslySetInnerHTML={{
                              __html: renderMarkdown(m.content),
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Actions au hover */}
                    <div
                      className="
                        mt-1.5 flex items-center gap-3 pl-2 text-[10px]
                        text-slate-400 opacity-0 transition-opacity duration-200
                        group-hover:opacity-100 dark:text-white/30
                      "
                    >
                      <span className="font-medium">{time}</span>
                      <span className="text-slate-300 dark:text-white/15">·</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(m.id, m.content)}
                        className="
                          flex items-center gap-1 rounded-md px-1.5 py-0.5
                          transition-colors hover:bg-slate-100 hover:text-slate-600
                          dark:hover:bg-white/[0.06] dark:hover:text-white/80
                        "
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check size={11} strokeWidth={2.5} />
                            Copié
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            Copier
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Typing — logo Gaynaako */}
          {sending && (
            <div className="flex gap-3">
              <BrandLogo size="sm" />
              <div
                className="
                  flex items-center gap-2.5 rounded-[22px] rounded-tl-md
                  border border-slate-200/60 bg-white/80 px-4 py-3
                  backdrop-blur-sm
                  dark:border-white/[0.08] dark:bg-white/[0.05]
                "
              >
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent/60" />
                </span>
                <span className="text-xs text-slate-400 dark:text-white/40">
                  Réflexion…
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200/70 bg-red-50/80 px-4 py-2.5 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-slate-200/50 px-6 py-4 dark:border-white/[0.06]">
        {inputBar}
      </div>
    </div>
  );
}