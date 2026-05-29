export function escapeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}
