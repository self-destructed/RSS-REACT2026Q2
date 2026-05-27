import {
  queryOptions,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { CharacterFilter, Character } from "../../model";
import { CHARACTER_API } from "../character-api";
import { http, type Info } from "@shared/api";
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

export function charactersQueryOptions(filters?: CharacterFilter) {
  const url = `${CHARACTER_API.list}?${buildQueryString(filters ?? null)}`;
  return queryOptions({
    queryKey: ["characters", url],
    queryFn: ({ signal }) => http.get<Info<Character[]>>(url, signal),
  });
}

export function useCharactersQuery(
  filters?: CharacterFilter,
): UseQueryResult<Info<Character[]>> {
  return useQuery(charactersQueryOptions(filters));
}

export function useCharacterQuery(
  id: string | undefined,
): UseQueryResult<Character> {
  return useQuery(characterQueryOptions(id));
}

export function characterQueryOptions(id: string | undefined) {
  return queryOptions({
    queryKey: ["character", id],
    queryFn: ({ signal }) => {
      if (id === undefined) throw new Error("id is required");
      return http.get<Character>(CHARACTER_API.byId(id), signal);
    },
    enabled: id !== undefined,
  });
}
