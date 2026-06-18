import { useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { categories } from "../data/categories";
import { useDarkMode } from "../hooks/useDarkMode";
import { CategoryTabs } from "../components/search/CategoryTabs";
import { SearchCombobox } from "../components/search/SearchCombobox";
import { SelectedChips } from "../components/search/SelectedChips";
import { CompareButton } from "../components/search/CompareButton";

export function Home() {
  const navigate = useNavigate();
  const [dark, toggleDark] = useDarkMode();
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("phones");
  const inputRef = useRef<HTMLInputElement>(null);

  const activeCat =
    categories.find(c => c.id === activeCategory) ?? categories[0];

  const filtered = useMemo(
    () =>
      activeCat.products.filter(
        p =>
          !selectedIds.includes(p.id) &&
          (!query ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, selectedIds, activeCat]
  );

  const allSelected = useMemo(
    () =>
      categories
        .flatMap(c => c.products)
        .filter(p => selectedIds.includes(p.id)),
    [selectedIds]
  );

  const addProduct = useCallback((id: string) => {
    setSelectedIds(prev => {
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const removeProduct = useCallback((id: string) => {
    setSelectedIds(prev => prev.filter(i => i !== id));
  }, []);

  const handleCatSelect = useCallback((id: string) => {
    setActiveCategory(id);
    setQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <div className='min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200 print:bg-white'>
      <div className='border-b border-gray-200 dark:border-gray-800 print:hidden'>
        <div className='max-w-4xl mx-auto px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <span className='text-lg font-bold text-gray-900 dark:text-white tracking-tight'>
              Compare everything
            </span>
          </div>
          <button
            className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer'
            onClick={toggleDark}
            type='button'
            aria-label='Toggle dark mode'
          >
            {dark ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
          </button>
        </div>
      </div>

      <div className='max-w-xl mx-auto px-6 pt-16 pb-16 animate-fade-in print:pt-4'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2'>
          Which one is right for you?
        </h1>
        <p className='text-gray-500 dark:text-gray-400 text-sm mb-6'>
          Select a category, search for items, add them to compare.
        </p>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleCatSelect}
        />

        <SearchCombobox
          query={query}
          onQueryChange={setQuery}
          filtered={filtered}
          activeCatName={activeCat.name}
          onAdd={addProduct}
          inputRef={inputRef}
        />

        {selectedIds.length > 0 && (
          <span className='mt-3 block text-xs text-violet-600 font-medium'>
            {selectedIds.length}/3
          </span>
        )}

        <SelectedChips products={allSelected} onRemove={removeProduct} />

        <CompareButton
          selectedCount={selectedIds.length}
          onClick={() => navigate(`/compare?ids=${selectedIds.join(",")}`)}
        />
      </div>
    </div>
  );
}
