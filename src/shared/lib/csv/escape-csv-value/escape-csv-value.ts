export function escapeCSVValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}
