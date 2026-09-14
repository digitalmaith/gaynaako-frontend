import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, X, Check, Loader2 } from "lucide-react";

export interface SelectOption {
  id: string;
  label: string;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string | string[]; // ids sélectionnés
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  error?: string;
  isLoading?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  multiple = false,
  placeholder = "Sélectionner...",
  error,
  isLoading = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedIds = useMemo(
    () => (multiple ? (Array.isArray(value) ? value : []) : []),
    [multiple, value]
  );

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  const getLabel = (id: string) => options.find((o) => o.id === id)?.label ?? id;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    if (multiple) {
      const next = selectedIds.includes(id)
        ? selectedIds.filter((v) => v !== id)
        : [...selectedIds, id];
      onChange(next);
    } else {
      onChange(id);
      setIsOpen(false);
      setQuery("");
    }
  };

  const removeChip = (id: string) => {
    onChange(selectedIds.filter((v) => v !== id));
  };

  const singleValue = !multiple && typeof value === "string" ? value : "";

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => !isLoading && setIsOpen((o) => !o)}
        className={`flex min-h-[42px] w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-lg border px-3 py-2 text-sm ${
          error ? "border-red-400" : "border-slate-300"
        } ${isOpen ? "ring-2 ring-accent/30 border-accent" : ""} ${isLoading ? "opacity-60" : ""}`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2 text-slate-400">
            <Loader2 size={14} className="animate-spin" /> Chargement...
          </span>
        ) : multiple && selectedIds.length > 0 ? (
          selectedIds.map((id) => (
            <span
              key={id}
              className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
            >
              {getLabel(id)}
              <X
                size={12}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeChip(id);
                }}
              />
            </span>
          ))
        ) : !multiple && singleValue ? (
          <span className="text-slate-700">{getLabel(singleValue)}</span>
        ) : (
          <span className="text-slate-400">{placeholder}</span>
        )}
        {!isLoading && <ChevronDown size={16} className="ml-auto shrink-0 text-slate-400" />}
      </div>

      {isOpen && !isLoading && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <Search size={14} className="text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full text-sm outline-none"
            />
          </div>
          <ul className="max-h-48 overflow-y-auto py-1">
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-slate-400">Aucun résultat</li>
            )}
            {filteredOptions.map((option) => {
              const isSelected = multiple ? selectedIds.includes(option.id) : singleValue === option.id;
              return (
                <li
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-slate-50"
                >
                  {option.label}
                  {isSelected && <Check size={14} className="text-accent" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}