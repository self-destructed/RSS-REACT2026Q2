import { escapeCsvValue } from "./escape-csv-value";

export function toCsv<T extends Record<string, string | number>>(
  data: T[],
  columns: readonly (keyof T)[],
): string {
  const header = columns.join(",");
  const rows = data.map((row) =>
    columns
      .map((col) => {
        const val = String(row[col]);
        return /[,"\n]/.test(val) ? escapeCsvValue(val) : val;
      })
      .join(","),
  );

  return [header, ...rows].join("\n");
}
