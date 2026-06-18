import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Moon, Sun, Copy, Check } from "lucide-react";
import { categories } from "../data/categories";
import { SPEC_FIELDS } from "../types";
import { useDarkMode } from "../hooks/useDarkMode";
import { computeScores, getBestIds } from "../utils/scores";
import { getDiffKeys, generateProsCons } from "../utils/comparison";
import { ProductCards } from "../components/compare/ProductCards";
import { ScoreOverview } from "../components/charts/ScoreOverview";
import { KeyDifferences } from "../components/compare/KeyDifferences";
import { BenchmarkCharts } from "../components/charts/BenchmarkCharts";
import { SpecsTable } from "../components/compare/SpecsTable";

export function Compare() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [dark, toggleDark] = useDarkMode();
  const [copied, setCopied] = useState(false);

  const allProducts = useMemo(() => categories.flatMap(c => c.products), []);

  const selected = useMemo(() => {
    const ids = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
    return allProducts.filter(p => ids.includes(p.id));
  }, [searchParams, allProducts]);

  const diffKeys = useMemo(() => getDiffKeys(selected), [selected]);
  const bestMap = useMemo(() => {
    const map = new Map<string, Set<string> | null>();
    for (const field of SPEC_FIELDS)
      map.set(field.key, getBestIds(selected, field.key));
    return map;
  }, [selected]);

  const dynamicScores = useMemo(
    () => selected.map(p => computeScores(p, allProducts)),
    [selected, allProducts]
  );

  const prosCons = useMemo(
    () => generateProsCons(selected, dynamicScores),
    [selected, dynamicScores]
  );

  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  if (selected.length < 2) {
    return (
      <div className='min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center gap-4'>
        <p className='text-gray-500 text-sm'>
          Not enough items selected to compare.
        </p>
        <button
          className='px-6 py-2.5 border border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-100'
          onClick={() => navigate("/")}
          type='button'
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200'>
      <div className='border-b border-gray-200 dark:border-gray-800 print:hidden'>
        <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button
              className='text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer flex items-center gap-1.5'
              onClick={() => navigate("/")}
              type='button'
            >
              <ChevronLeft className='w-3.5 h-3.5' /> Back
            </button>
            <span className='text-lg font-bold text-gray-900 dark:text-white tracking-tight'>
              Compare everything
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <button
              className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer flex items-center gap-1.5 text-xs'
              onClick={copyUrl}
              type='button'
              aria-label='Copy comparison URL'
            >
              {copied ? (
                <Check className='w-3.5 h-3.5 text-emerald-500' />
              ) : (
                <Copy className='w-3.5 h-3.5' />
              )}
              <span className='hidden sm:inline'>
                {copied ? "Copied!" : "Share"}
              </span>
            </button>
            <button
              className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer'
              onClick={toggleDark}
              type='button'
              aria-label='Toggle dark mode'
            >
              {dark ? (
                <Sun className='w-4 h-4' />
              ) : (
                <Moon className='w-4 h-4' />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-10 animate-fade-in'>
        <ProductCards selected={selected} />
        <ScoreOverview selected={selected} dynamicScores={dynamicScores} />
        <KeyDifferences lines={prosCons} />
        <BenchmarkCharts selected={selected} />
        <SpecsTable selected={selected} diffKeys={diffKeys} bestMap={bestMap} />

        {selected.length < 3 && (
          <div className='mt-8 text-center animate-fade-in print:hidden'>
            <button
              className='px-6 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold cursor-pointer hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors'
              onClick={() => navigate("/")}
              type='button'
            >
              Compare more products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
