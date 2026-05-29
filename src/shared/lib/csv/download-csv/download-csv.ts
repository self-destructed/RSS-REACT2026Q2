import { toCSV } from "../to-csv";
import { downloadFile } from "../download-file";

export function downloadCsv<T extends Record<keyof T, unknown>>(
  data: T[],
  columns: readonly (keyof T)[],
  fileName: string,
): void {
  const csv = toCSV(data, columns);
  downloadFile({ data: csv, fileName, fileType: "text/csv" });
}
