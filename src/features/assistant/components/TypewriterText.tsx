// src/features/assistant/components/TypewriterText.tsx
import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  onTick?: () => void;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^[\*\-] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^---$/gm, "<hr>")
    .replace(/\n{2,}/g, "<br><br>")
    .replace(/\n/g, "<br>");
}

export function TypewriterText({ text, speed = 20, onComplete, onTick }: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [done, setDone] = useState(false);
  const wordsRef = useRef<string[]>([]);
  const completedRef = useRef(false);

  useEffect(() => {
    wordsRef.current = text.match(/\S+\s*|\s+/g) ?? [text];
    completedRef.current = false;
    setWordIndex(0);
    setDone(false);

    const timer = setInterval(() => {
      setWordIndex((prev) => {
        const next = prev + 1;
        onTick?.();

        if (next >= wordsRef.current.length) {
          clearInterval(timer);
          if (!completedRef.current) {
            completedRef.current = true;
            setDone(true);
            onComplete?.();
          }
        }
        return next;
      });
    }, speed);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  // Une fois complet : rendu markdown final, une seule fois, sans retokeniser en boucle
  if (done) {
    return (
      <div
        className="markdown-content animate-in fade-in duration-200"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
      />
    );
  }

  // Pendant le streaming : texte brut uniquement — jamais de markdown parsé partiellement,
  // donc jamais de tag cassé ni de flash de caractères bruts (*, _, #...)
  const partial = wordsRef.current.slice(0, wordIndex).join("");
  return <div className="whitespace-pre-wrap">{partial}</div>;
}
