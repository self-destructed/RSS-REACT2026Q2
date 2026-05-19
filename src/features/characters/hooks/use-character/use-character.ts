import type {
  CharacterFilter,
  Info,
  Character,
} from "../../../../shared/api/types";
import { useFetch, type LoadingState } from "../../../../shared/hooks/useFetch";
import { buildQueryString } from "../../../../shared/utils";
import { API_BASE_URL, API_ENDPOINTS } from "../../../../shared/constants/api";

export function useCharacters(
  filters?: CharacterFilter,
): LoadingState<Info<Character[]>> {
  const params = filters as
    | Record<string, string | number | null | undefined>
    | undefined;
  const url = `${API_BASE_URL}${API_ENDPOINTS.character}?${buildQueryString(params)}`;
  return useFetch<Info<Character[]>>(url);
}

export function useCharacter(id: number | null): LoadingState<Character> {
  const url = id
    ? `${API_BASE_URL}${API_ENDPOINTS.character}/${String(id)}`
    : null;
  return useFetch<Character>(url);
}
