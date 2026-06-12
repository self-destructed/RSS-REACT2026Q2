# Performance Report — CO₂ Emissions Data Explorer

## Methodology

- **Profiling tool:** React `<Profiler>` component (`onRender` callback logs to console)
- **Environment:** Development mode (`npm run dev`), Vite, React 19
- **Browser:** Google Chrome
- **Mode:** Development build
- **Baseline:** Unoptimized starter code
- **Optimized:** After all optimizations applied (to be measured)
- All measurements taken from the same machine under similar conditions

---

## Phase 1: Initial Profiling (Baseline)

The baseline was measured using the built-in React `<Profiler>` component. Four standard interactions were recorded.

### Baseline Metrics

#### 1. Country Search (typing "a")

| Metric | Before | After |
|--------|--------|-------|
| Render duration | 692.00ms | |
| Commit duration | 694.00ms | |

#### 2. Year Select (2020 → 2024)

| Metric | Before | After |
|--------|--------|-------|
| Render duration | 753.00ms | |
| Commit duration | 754.50ms | |

#### 3. Sort By Population (asc)

| Metric | Before | After |
|--------|--------|-------|
| Render duration | 701.90ms | |
| Commit duration | 704.90ms | |

#### 4. Column Toggle (add "coal_co2")

| Metric | Before | After |
|--------|--------|-------|
| Render duration | 795.90ms | |
| Commit duration | 798.30ms | |

### Baseline Screenshots

| Interaction | Screenshot |
|-------------|-----------|
| Country Search (typing "a") | `performance/before/country_search.png` |
| Sort By Population (asc) | `performance/before/sort_by_population_asc.png` |
| Year Select (2020 → 2024) | `performance/before/year_select.png` |
| Column Toggle (add "coal_co2") | `performance/before/modal_add_coal_co2.png` |

### Baseline Observations

The starter code had several known performance issues:

1. **No memoization** — all handlers are plain functions recreated on every render
2. **No `React.memo`** — every parent re-render causes all children to re-render
3. **Inefficient year data lookup** — `createYearDataMap()` called inside `.sort()` comparator for every comparison, rebuilding the Map from scratch O(n²)
4. **Stale closures** — `setState({ ...state, ... })` captures an outdated `state` reference
5. **Single monolithic state** — one `useState<AppState>` with manual spreads
6. **No list virtualization** — all ~200 country cards are rendered at once
7. **No debounce on search** — `onChange` fires on every keystroke, triggering full re-render

---

## Phase 2: Applied Optimizations

TBD — list of optimizations applied.

---

## Phase 3: Final Profiling (Comparison)

TBD — after optimization measurements.

### Comparison Summary

| Interaction | Before (render) | Before (commit) | After (render) | After (commit) | Improvement |
|-------------|----------------|-----------------|----------------|----------------|-------------|
| Country Search | 692.00ms | 694.00ms | | | |
| Year Select | 753.00ms | 754.50ms | | | |
| Sort By Population | 701.90ms | 704.90ms | | | |
| Column Toggle | 795.90ms | 798.30ms | | | |

---

## Appendix: Screenshots

### Before (Baseline)

| Screenshot | Path |
|------------|------|
| Country Search | `performance/before/country_search.png` |

### After (Optimized)

TBD
