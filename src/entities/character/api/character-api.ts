import type { Character } from "../model";
import { API_BASE_URL } from "@shared/api-config";
import { http } from "@shared/api";

export const CHARACTER_API = {
  list: `${API_BASE_URL}/character` as const,
  byId: (id: number) => `${API_BASE_URL}/character/${String(id)}`,
  byIds: (ids: number[]) => `${API_BASE_URL}/character/${ids.join(",")},`,
} as const;

export async function fetchCharacters(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  return http.get<Character[]>(CHARACTER_API.byIds(ids));
}
