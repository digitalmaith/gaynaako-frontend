// src/features/assistant/components/AssistantChatBox.tsx
import { useRef, useState, useEffect } from "react";
import { Bot, Send, Loader2, Sparkles, User, AlertCircle, RotateCcw } from "lucide-react";
import { useAssistantChat } from "../hooks/useAssistantChat";
import type { ChatContext } from "../types";

// 🎨 Palette de la marque
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
};

interface AssistantChatBoxProps {
  context?: ChatContext;
  placeholder?: string;
  suggestions?: string[];
}

export function AssistantChatBox({
  context,
  placeholder,
  suggestions,
}: AssistantChatBoxProps) {
  const { messages, sending, error, send } = useAssistantChat(context);
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas à chaque nouveau message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    const text = message;
    setMessage("");
    await send(text);
  };

  const handleSuggestion = (text: string) => {
    setMessage(text);
    inputRef.current?.focus();
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 dark:bg-white/5 ${
        isFocused
          ? "border-transparent shadow-lg"
          : "border-slate-200 dark:border-white/10"
      }`}
      style={
        isFocused
          ? {
              boxShadow: `0 0 0 2px ${BRAND.orange}, 0 10px 30px -10px ${BRAND.orange}44`,
            }
          : {}
      }
    >
      {/* ===== EN-TÊTE ===== */}
      <div
        className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3 dark:border-white/5"
        style={{
          background: `linear-gradient(135deg, ${BRAND.navySoft} 0%, ${BRAND.orangeSoft} 100%)`,
        }}
      >
        <div
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
          style={{
            background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.orange})`,
          }}
        >
          <Sparkles size={14} />
          {/* Pastille "en ligne" */}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-sm font-semibold leading-tight"
            style={{ color: BRAND.navy }}
          >
            Gaynaako Assistant
          </p>
          <p className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-white/50">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            En ligne · répond en quelques secondes
          </p>
        </div>
      </div>

      {/* ===== MESSAGES ===== */}
      {messages.length > 0 && (
        <div
          ref={scrollRef}
          className="max-h-72 space-y-3 overflow-y-auto px-4 py-4"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar bot */}
              {m.role === "assistant" && (
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: BRAND.orange }}
                >
                  <Bot size={13} />
                </div>
              )}

              {/* Bulle */}
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-tr-sm text-white"
                    : "rounded-tl-sm border border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                }`}
                style={
                  m.role === "user"
                    ? { background: BRAND.navy }
                    : {}
                }
              >
                {m.content}
              </div>

              {/* Avatar user */}
              {m.role === "user" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-white/70">
                  <User size={13} />
                </div>
              )}
            </div>
          ))}

          {/* Indicateur de frappe */}
          {sending && (
            <div className="flex items-start gap-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: BRAND.orange }}
              >
                <Bot size={13} />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== ERREUR ===== */}
      {error && (
        <div className="mx-4 mb-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p>{error}</p>
            <button
              onClick={() => handleSuggestion("")}
              className="mt-1 flex items-center gap-1 font-medium text-red-700 underline-offset-2 hover:underline dark:text-red-200"
            >
              <RotateCcw size={10} />
              Réessayer
            </button>
          </div>
        </div>
      )}

      {/* ===== ZONE DE SAISIE ===== */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSend();
        }}
        className="flex items-center gap-2 border-t border-slate-100 px-3 py-2.5 dark:border-white/5"
      >
        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder ?? "Demandez à l'assistant Gaynaako..."}
          className="min-w-0 flex-1 bg-transparent py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-white/30"
        />

        {/* Bouton d'envoi */}
        <button
          type="submit"
          disabled={!message.trim() || sending}
          aria-label="Envoyer"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: BRAND.orange }}
        >
          {sending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
        </button>
      </form>

      {/* ===== SUGGESTIONS ===== */}
      {suggestions && suggestions.length > 0 && messages.length === 0 && (
        <div className="flex flex-wrap gap-2 border-t border-slate-100 px-3 py-3 dark:border-white/5">
          {suggestions.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => handleSuggestion(text)}
              className="group flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
            >
              <Sparkles
                size={10}
                className="transition"
                style={{ color: BRAND.orange }}
              />
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}