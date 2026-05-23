import { fetchCharacters } from "./fetch-characters";
import { toCsv, downloadFile } from "@shared/utils";

const CHARACTER_COLUMNS = [
  "id",
  "name",
  "status",
  "species",
  "gender",
  "origin",
  "location",
] as const;

export async function downloadCsv(ids: number[]): Promise<void> {
  const characters = await fetchCharacters(ids);

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
    fileName: "selected-characters.csv",
    fileType: "text/csv",
  });
}
