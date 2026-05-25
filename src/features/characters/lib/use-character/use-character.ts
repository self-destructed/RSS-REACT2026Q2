import type { CharacterFilter, Info, Character } from "@shared/api";
import { useFetch, type LoadingState } from "@shared/lib";
import { buildQueryString } from "@shared/lib";
import { API_BASE_URL, API_ENDPOINTS } from "@shared/api-config";

export function useCharacters(
  filters?: CharacterFilter,
): LoadingState<Info<Character[]>> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.character}?${buildQueryString(filters ?? null)}`;
  return useFetch<Info<Character[]>>(url);
}

export function useCharacter(id: number | null): LoadingState<Character> {
  const url = id
    ? `${API_BASE_URL}${API_ENDPOINTS.character}/${String(id)}`
    : null;
  return useFetch<Character>(url);
}
