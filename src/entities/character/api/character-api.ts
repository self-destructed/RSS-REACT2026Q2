import type { Character, CharacterId } from "../model";
import { API_BASE_URL } from "@shared/api";
import { http } from "@shared/api";

export const CHARACTER_API = {
  list: `${API_BASE_URL}/character` as const,
  byId: (id: CharacterId) => `${API_BASE_URL}/character/${String(id)}`,
  byIds: (ids: CharacterId[]) => `${API_BASE_URL}/character/${ids.join(",")},`,
} as const;

export async function fetchCharacters(
  ids: CharacterId[],
): Promise<Character[]> {
  if (ids.length === 0) return [];
  return http.get<Character[]>(CHARACTER_API.byIds(ids));
}
