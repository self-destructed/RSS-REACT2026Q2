import { type Character } from "@entities/character";
import { toCsv, downloadFile } from "@shared/lib";

const CHARACTER_COLUMNS = [
  "id",
  "name",
  "status",
  "species",
  "gender",
  "origin",
  "location",
] as const;

export function downloadCsv(characters: Character[]): void {
  const rows = characters.map((c) => ({
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin.name,
    location: c.location.name,
  }));

  const csv = toCsv(rows, CHARACTER_COLUMNS);

  downloadFile({
    data: csv,
    fileName: `${String(characters.length)}_items.csv`,
    fileType: "text/csv",
  });
}
