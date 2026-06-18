import { http, API_BASE_URL, type Info } from "@shared/api";
import { buildQueryString } from "@shared/lib/url-params";
import type { Character, CharacterFilter } from "../model/types";
import { CHARACTER_API } from "./character-api";

export async function getCharacters(
  filters?: CharacterFilter,
): Promise<Info<Character[]>> {
  const url = `${CHARACTER_API.list}?${buildQueryString(filters ?? null)}`;
  return http.get<Info<Character[]>>(url);
}

export async function getCharacter(id: number | undefined): Promise<Character> {
  if (id === undefined) throw new Error("id is required");
  return http.get<Character>(CHARACTER_API.byId(id));
}

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  const sortedIds = [...ids].sort((a, b) => a - b);
  return http.get<Character[]>(
    `${API_BASE_URL}/character/${sortedIds.join(",")},`,
  );
}
