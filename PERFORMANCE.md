# Performance Report — CO₂ Emissions Data Explorer

## Methodology

- **Profiling tool:** React `<Profiler>` component (`onRender` callback logs to console)
- **Environment:** Development mode (`npm run dev`), Vite, React 19
- **Browser:** Google Chrome
- **Mode:** Development build
- **Baseline:** Unoptimized starter code (commit `b8cb637`)
- **Optimized:** Optimized code on `performance` branch
- All measurements taken from the same machine under similar conditions

---

## Phase 1: Initial Profiling (Baseline)

The baseline was measured using the built-in React `<Profiler>` component. Four standard interactions were recorded on the unoptimized starter code.

### Baseline Metrics

#### 1. Country Search (typing "a")

| Metric          | Before   | After    |
| --------------- | -------- | -------- |
| Render duration | 692.00ms | 107.10ms |
| Commit duration | 694.00ms | 107.60ms |

#### 2. Year Select (2020 → 2024)

| Metric          | Before   | After    |
| --------------- | -------- | -------- |
| Render duration | 753.00ms | 254.30ms |
| Commit duration | 754.50ms | 255.80ms |

#### 3. Sort By Population (asc)

| Metric          | Before   | After   |
| --------------- | -------- | ------- |
| Render duration | 701.90ms | 80.80ms |
| Commit duration | 704.90ms | 81.40ms |

#### 4. Column Toggle (add "coal_co2")

| Metric          | Before   | After    |
| --------------- | -------- | -------- |
| Render duration | 795.90ms | 116.50ms |
| Commit duration | 798.30ms | 117.50ms |

### Baseline Screenshots

| Interaction                    | Screenshot                                      |
| ------------------------------ | ----------------------------------------------- |
| Country Search (typing "a")    | `performance/before/country_search.png`         |
| Sort By Population (asc)       | `performance/before/sort_by_population_asc.png` |
| Year Select (2020 → 2024)      | `performance/before/year_select.png`            |
| Column Toggle (add "coal_co2") | `performance/before/modal_add_coal_co2.png`     |

### Baseline Observations

The starter code had several known performance issues:

1. **No memoization** — all handlers are plain functions recreated on every render
2. **No `React.memo`** — every parent re-render causes all children to re-render
3. **Inefficient year data lookup** — `createYearDataMap()` called inside `.sort()` comparator for every comparison, rebuilding the Map from scratch O(n²)
4. **Stale closures** — `setState({ ...state, ... })` captures an outdated `state` reference
5. **Single monolithic state** — one `useState<AppState>` with manual spreads
6. **No list virtualization** — all ~200 country cards are rendered at once
7. **Debounce (500ms) on search** — added then later replaced by `useDeferredValue` for instant input responsiveness

---

## Phase 2: Applied Optimizations

The following optimizations were implemented on the `performance` branch:

| #   | Optimization                                                                          | Files                         |
| --- | ------------------------------------------------------------------------------------- | ----------------------------- |
| 1   | **`React.memo` on `CountryCard`**                                                     | `country-card.tsx`            |
| 2   | **`React.memo` on `CountryList`**                                                     | `country-list.tsx`            |
| 3   | **`React.memo` on `SearchBar`**                                                       | `search-bar.tsx`              |
| 4   | **`React.memo` on `YearSelector`**                                                    | `year-selector.tsx`           |
| 5   | **`useMemo` for `filteredCountries`**                                                 | `country-list.tsx`            |
| 6   | **`useMemo` for `yearDataMap`**                                                       | `country-card.tsx`            |
| 7   | **`useMemo` for `years`**                                                             | `app.tsx`                     |
| 8   | **`useMemo` for `availableColumns`**                                                  | `app.tsx`                     |
| 9   | **Split filter/sort into separate `useMemo`**                                         | `country-list.tsx`            |
| 10  | **Pre-computed `countryMapsByYear` after filter**                                     | `country-list.tsx`            |
| 11  | **Hoisted `searchQuery.toLowerCase()` out of filter**                                 | `country-list.tsx`            |
| 12  | **`useCallback` for `handleSearch`**                                                  | `app.tsx`                     |
| 13  | **`useCallback` for `handleYearChange`**                                              | `app.tsx`                     |
| 14  | **Functional updaters (`setState(prev => ...)`)**                                     | `app.tsx`                     |
| 15  | **Proper key props (`key={column}` in DataTable)**                                    | `data-table.tsx`              |
| 16  | **Virtualization via `react-window`**                                                 | `country-list.tsx`            |
| 17  | **300ms debounce on search input**                                                    | `search-bar.tsx`              |
| 18  | **Unused `onYearChange` prop removed**                                                | `country-list.tsx`, `app.tsx` |
| 19  | **`useDeferredValue` for search**                                                     | `app.tsx`                     |
| 20  | **Local draft state in `ColumnModal`** (replaced `onToggle` with internal `useState`) | `column-modal.tsx`, `app.tsx` |
| 21  | **Removed `useDebounce` from `SearchBar`** (replaced by `useDeferredValue`)           | `search-bar.tsx`              |
| 22  | **Conditional render + draft for column modal** (no `isOpen` prop, unmount approach)  | `column-modal.tsx`, `app.tsx` |

---

## Phase 3: Final Profiling (Comparison)

### Optimized Metrics

#### 1. Country Search (typing "a") — Optimized

| Metric          | Value    |
| --------------- | -------- |
| Render duration | 107.10ms |
| Commit duration | 107.60ms |

**Screenshot (after):** `performance/after/country_search.png`

#### 2. Year Select (2020 → 2024) — Optimized

| Metric          | Value    |
| --------------- | -------- |
| Render duration | 254.30ms |
| Commit duration | 255.80ms |

**Screenshot (after):** `performance/after/year_select.png`

#### 3. Sort By Population (asc) — Optimized

| Metric          | Value   |
| --------------- | ------- |
| Render duration | 80.80ms |
| Commit duration | 81.40ms |

**Screenshot (after):** `performance/after/sort_by_population_asc.png`

#### 4. Column Toggle (add "coal_co2") — Optimized

| Metric          | Value    |
| --------------- | -------- |
| Render duration | 116.50ms |
| Commit duration | 117.50ms |

**Screenshot (after):** `performance/after/column_toggle.png`

### Comparison Summary

| Interaction        | Before (render) | After (render) | Before (commit) | After (commit) | Improvement |
| ------------------ | --------------- | -------------- | --------------- | -------------- | ----------- |
| Country Search     | 692.00ms        | 107.10ms       | 694.00ms        | 107.60ms       | **~6.5×**   |
| Year Select        | 753.00ms        | 254.30ms       | 754.50ms        | 255.80ms       | **~3.0×**   |
| Sort By Population | 701.90ms        | 80.80ms        | 704.90ms        | 81.40ms        | **~8.7×**   |
| Column Toggle      | 795.90ms        | 116.50ms       | 798.30ms        | 117.50ms       | **~6.8×**   |

### Key Achievements

1. **`useDeferredValue` for search** — replaced debounce, input stays responsive, filtering runs in background with interruptible rendering
2. **Virtualization + memo** — only visible rows render, flat comparators prevent unnecessary updates
3. **Split filter/sort pipeline** — year changes no longer re-run the filter, only the sort
4. **Cached year data maps** — `createYearDataMap()` runs once per country per filter pass, not O(n²) in sort
5. **Functional state updaters** — eliminated stale closure bugs and reduced re-render chains
6. **Column modal local draft** — column changes apply only on modal close, eliminating re-renders of CountryList while editing

---

## Appendix: Screenshots

### Before (Baseline)

| Screenshot         | Path                                            |
| ------------------ | ----------------------------------------------- |
| Country Search     | `performance/before/country_search.png`         |
| Sort By Population | `performance/before/sort_by_population_asc.png` |
| Year Select        | `performance/before/year_select.png`            |
| Column Toggle      | `performance/before/modal_add_coal_co2.png`     |

### After (Optimized)

| Screenshot         | Path                                           |
| ------------------ | ---------------------------------------------- |
| Country Search     | `performance/after/country_search.png`         |
| Sort By Population | `performance/after/sort_by_population_asc.png` |
| Year Select        | `performance/after/year_select.png`            |
| Column Toggle      | `performance/after/column_toggle.png`          |
