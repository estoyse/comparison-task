import { useState, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import type { Product } from "../../types";
import { ProductIcon } from "../common/ProductIcon";
import { highlightMatch } from "../../utils/highlight";

interface SearchComboboxProps {
  query: string;
  onQueryChange: (q: string) => void;
  filtered: Product[];
  activeCatName: string;
  onAdd: (id: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function SearchCombobox({
  query,
  onQueryChange,
  filtered,
  activeCatName,
  onAdd,
  inputRef,
}: SearchComboboxProps) {
  const [focused, setFocused] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const blurRef = useRef<number>(undefined);
  const listRef = useRef<HTMLDivElement>(null);

  const open = focused && filtered.length > 0;

  const handleFocus = () => {
    clearTimeout(blurRef.current);
    setFocused(true);
  };
  const handleBlur = () => {
    blurRef.current = window.setTimeout(() => setFocused(false), 150);
  };

  useEffect(() => () => clearTimeout(blurRef.current), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIdx(i => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIdx(i => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && highlightIdx >= 0) {
        e.preventDefault();
        onAdd(filtered[highlightIdx].id);
      } else if (e.key === "Escape") {
        setFocused(false);
      }
    },
    [open, filtered, highlightIdx, onAdd]
  );

  useEffect(() => {
    if (highlightIdx >= 0 && listRef.current) {
      const items =
        listRef.current.querySelectorAll<HTMLButtonElement>("button");
      items[highlightIdx]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIdx]);

  return (
    <div className='relative'>
      <div className='border border-gray-300 dark:border-gray-700 flex items-center bg-white dark:bg-gray-900'>
        <span className='pl-4 pr-0 text-gray-400'>
          <Search className='w-4 h-4' />
        </span>
        <input
          ref={inputRef}
          className='flex-1 px-3 py-3.5 text-sm outline-none border-none bg-transparent text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500'
          placeholder={`Search ${activeCatName.toLowerCase()}...`}
          value={query}
          onChange={e => {
            onQueryChange(e.target.value);
            setHighlightIdx(-1);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          role='combobox'
          aria-expanded={open}
          aria-controls='search-results'
          aria-activedescendant={
            highlightIdx >= 0
              ? `result-${filtered[highlightIdx]?.id}`
              : undefined
          }
          aria-label={`Search ${activeCatName}`}
        />
      </div>

      {open && (
        <div
          id='search-results'
          ref={listRef}
          role='listbox'
          className='absolute z-10 top-full left-0 right-0 border border-t-0 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 animate-slide-down'
        >
          {filtered.map((p, i) => (
            <button
              key={p.id}
              id={`result-${p.id}`}
              role='option'
              aria-selected={i === highlightIdx}
              className={
                "w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 dark:border-gray-800 last:border-b-0 cursor-pointer transition-colors " +
                (i === highlightIdx
                  ? "bg-violet-50 dark:bg-violet-950"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800")
              }
              onMouseDown={e => {
                e.preventDefault();
                onAdd(p.id);
              }}
              onMouseEnter={() => setHighlightIdx(i)}
              type='button'
            >
              <ProductIcon
                name={p.icon}
                size={20}
                className='text-gray-700 dark:text-gray-300'
              />
              <div className='flex-1 min-w-0'>
                <div className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
                  {highlightMatch(p.name, query)}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>
                  {p.brand}
                </div>
              </div>
              <span className='text-sm font-semibold text-gray-700 dark:text-gray-300 shrink-0'>
                ${p.price.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
