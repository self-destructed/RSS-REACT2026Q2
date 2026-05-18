import type {
  CharacterFilter,
  Info,
  Character,
} from "../../../../shared/api/types";
import useFetch from "../../../../shared/hooks/useFetch";
import { buildQueryString } from "../../../../shared/utils";

const BASE_URL = "https://rickandmortyapi.com/api";
const CHARACTER_ENDPOINT = "/character";

type LoadingState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export function useCharacters(
  filters?: CharacterFilter,
): LoadingState<Info<Character[]>> {
  const params = filters as
    | Record<string, string | number | null | undefined>
    | undefined;
  const url = `${BASE_URL}${CHARACTER_ENDPOINT}?${buildQueryString(params)}`;
  return useFetch<Info<Character[]>>(url);
}

export function useCharacter(id: number | null): LoadingState<Character> {
  const url = id ? `${BASE_URL}${CHARACTER_ENDPOINT}/${String(id)}` : null;
  return useFetch<Character>(url);
}
