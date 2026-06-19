import type { CharacterId } from "@entities/character";
import {
  mapCharacterToCSVObject,
  CHARACTER_CSV_COLUMNS,
} from "@entities/character";
import { getCharactersByIds } from "@entities/character/api/get-characters";
import { toCSV } from "@shared/lib/csv";

export async function generateCharacterCSV(
  ids: CharacterId[],
): Promise<string> {
  const characters = await getCharactersByIds(ids);
  const rows = characters.map(mapCharacterToCSVObject);
  return toCSV(rows, CHARACTER_CSV_COLUMNS);
}
