// src/features/assistant/components/DashboardChatEntry.tsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Send } from "lucide-react";

interface DashboardChatEntryProps {
  suggestions?: string[];
}

export function DashboardChatEntry({ suggestions }: DashboardChatEntryProps) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const goToAssistant = (text: string) => {
    const value = text.trim();
    if (!value) return;
    navigate("/app/assistant", { state: { initialMessage: value } });
  };

  const handleSuggestion = (text: string) => {
    goToAssistant(text);
  };

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        isFocused
          ? "border-primary ring-2 ring-primary/20 dark:border-accent dark:ring-accent/20"
          : "border-slate-200 dark:border-white/10"
      }`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToAssistant(message);
        }}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 dark:border-white/10"
      >
        <Bot size={16} className="shrink-0 text-slate-400 dark:text-white/30" />
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Demandez à l'assistant Gaynaako une recommandation..."
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-white/30"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          aria-label="Envoyer"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={14} />
        </button>
      </form>

      {suggestions && suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => handleSuggestion(text)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}