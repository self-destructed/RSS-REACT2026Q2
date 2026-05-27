import type { CharacterFilter, Character } from "../../model";
import { CHARACTER_API } from "../character-api";
import type { Info } from "@shared/api";
import { useFetch, type LoadingState } from "@shared/lib";
import { buildQueryString } from "@shared/lib";

export function useCharacters(
  filters?: CharacterFilter,
): LoadingState<Info<Character[]>> {
  const url = `${CHARACTER_API.list}?${buildQueryString(filters ?? null)}`;
  return useFetch<Info<Character[]>>(url);
}

export function useCharacter(id: number | null): LoadingState<Character> {
  const url = id !== null ? CHARACTER_API.byId(String(id)) : null;
  return useFetch<Character>(url);
}
