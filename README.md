# Versus — Product Comparison Tool

A single-page product comparison app built with React 19, TypeScript, Vite, and Tailwind CSS 4. Compare smartphones and laptops side-by-side across 36+ spec fields with dynamic scoring, radar charts, and bar charts.

> **Note:** All product data is hardcoded in `src/data/data.ts` and `src/data/laptops.ts`. There is no external API or backend — the app ships with 22 phones and 4 laptops built in.

Inspired by [versus.com](https://versus.com) — the idea of comparing products side-by-side across detailed spec categories.

## Tech Stack

| Layer     | Technology                           |
| --------- | ------------------------------------ |
| Framework | React 19                             |
| Language  | TypeScript 6                         |
| Build     | Vite 8                               |
| Styling   | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing   | React Router 7                       |
| Icons     | Lucide React                         |
| Charts    | Custom SVG (no chart library)        |
| Lint | ESLint 10 with typescript-eslint |

## Scripts

```sh
npm run dev       # Start dev server with HMR
npm run build     # Type-check + production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Project Structure

```
src/
├── main.tsx                     # Entry point, BrowserRouter
├── App.tsx                      # Routes + ErrorBoundary
├── index.css                    # Tailwind import + custom animations + print styles
├── types.ts                     # Product, Scores, SpecField, ProductCategory
│
├── data/
│   ├── data.ts                  # 22 phone products with full specs
│   ├── data/laptops.ts          # 4 laptop products
│   └── data/categories.ts       # Category registry (phones, laptops)
│
├── utils/
│   ├── scores.ts                # Dynamic score computation + best-value detection
│   ├── scores.test.ts           # 7 unit tests
│   ├── comparison.ts            # formatValue, getDiffKeys, generateProsCons
│   └── highlight.tsx            # Search-result text highlighting
│
├── hooks/
│   └── useDarkMode.ts           # Dark mode with localStorage persistence
│
├── components/
│   ├── common/
│   │   ├── ErrorBoundary.tsx    # Class-based error boundary
│   │   └── ProductIcon.tsx      # Icon name → Lucide component mapper
│   ├── charts/
│   │   ├── RadarChart.tsx       # SVG radar/spider chart
│   │   ├── BarChart.tsx         # Horizontal bar chart
│   │   ├── ScoreOverview.tsx    # Radar + color legend
│   │   └── BenchmarkCharts.tsx  # AnTuTu / Geekbench / battery bars
│   ├── compare/
│   │   ├── ProductCards.tsx     # Product header cards with color accents
│   │   ├── KeyDifferences.tsx   # Pros/cons summary
│   │   └── SpecsTable.tsx       # Full spec comparison table
│   └── search/
│       ├── CategoryTabs.tsx     # Phones / Laptops tab switcher
│       ├── SearchCombobox.tsx   # Combobox input + dropdown with keyboard nav
│       ├── SelectedChips.tsx    # Selected product pills with remove button
│       └── CompareButton.tsx    # CTA with enable/disable states
│
└── pages/
    ├── Home.tsx                 # Search page — category tabs, combobox, selection
    └── Compare.tsx              # Compare page — charts, pros/cons, spec table
```

## Features

### Product Selection

- **Category tabs** — switch between Smartphones (22 models) and Laptops (4 models)
- **Search combobox** — type to filter, `↑`/`↓`/`Enter`/`Esc` keyboard navigation
- **Selection chips** — up to 3 products, removable via × button
- **Search highlighting** — matched query text highlighted in results

### Comparison View

- **Score radar** — 6-axis spider chart (Screen, Camera, Performance, Battery, Design, Value)
- **Benchmark bars** — AnTuTu, Geekbench Multi, Battery capacity
- **Key differences** — auto-generated pros/cons from score deltas
- **Specs table** — 36 fields across 7 categories, inline differences and best-value highlighting
- **Best value** — green-highlighted cells for the best numeric value in each row

### Scoring (`src/utils/scores.ts`)

Scores are computed dynamically (0–10) by normalizing real specs against all products in the catalog:

| Axis        | Inputs                                                                  |
| ----------- | ----------------------------------------------------------------------- |
| Screen      | Pixel density (30%), Brightness (25%), Refresh rate (25%), Rating (20%) |
| Camera      | Rating (40%), Price weight (10%), Telephoto bonus, Ultrawide bonus      |
| Performance | AnTuTu (35%), Geekbench Multi (30%), RAM (20%), Storage (15%)           |
| Battery     | Capacity (50%), Charging speed (30%), Wireless charging bonus           |
| Design      | Weight (25%), IP rating (40%), Materials premiumness (35%)              |
| Value       | Price inverse (50%), Rating (30%), Battery (10%), AnTuTu (10%)          |

### UI / UX

- **Dark mode** — class-based with `prefers-color-scheme` fallback, persisted in `localStorage`
- **Responsive** — stacked on mobile, row layout on desktop
- **Animations** — fade-in, scale-in, slide-down on page sections
- **Print styles** — clean table layout, hides dark mode toggle
- **Accessibility** — ARIA roles (`combobox`, `listbox`, `tablist`, `table`), labels, keyboard navigation
- **Share URL** — copies comparison URL to clipboard
- **Error boundary** — catches render errors with reload button

## Development

All charts are custom SVG — no charting libraries are used.

```sh
npm run dev       # http://localhost:5173
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint with TypeScript rules
```
