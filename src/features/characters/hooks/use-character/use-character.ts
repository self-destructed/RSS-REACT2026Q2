import type { CharacterFilter, Info, Character } from "@shared/api";
import { useFetch, type LoadingState } from "@shared/hooks";
import { buildQueryString } from "@shared/utils";
import { API_BASE_URL, API_ENDPOINTS } from "@shared/constants";

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
