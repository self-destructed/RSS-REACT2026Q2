import { escapeCSVValue } from "../escape-csv-value";

export function toCSV<T extends Record<keyof T, unknown>>(
  data: T[],
  columns: readonly (keyof T)[],
): string {
  const header = columns.join(",");
  const rows = data.map((row) =>
    columns
      .map((col) => {
        const raw = row[col];
        const val = raw === null || raw === undefined ? "" : String(raw);
        return /[,"\n]/.test(val) ? escapeCSVValue(val) : val;
      })
      .join(","),
  );

  return [header, ...rows].join("\n");
}
