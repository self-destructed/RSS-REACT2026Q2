import {
  queryOptions,
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { CharacterFilter, Character } from "../../model";
import { CHARACTER_API } from "../character-api";
import { http, type Info } from "@shared/api";
import { buildQueryString } from "@shared/lib";

export function charactersQueryOptions(
  filters?: CharacterFilter,
): UseQueryOptions<
  Info<Character[]>,
  Error,
  Info<Character[]>,
  readonly ["characters", string]
> {
  const url = `${CHARACTER_API.list}?${buildQueryString(filters ?? null)}`;
  return queryOptions({
    queryKey: ["characters", url] as const,
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

export function characterQueryOptions(
  id: string | undefined,
): UseQueryOptions<
  Character,
  Error,
  Character,
  readonly ["character", string | undefined]
> {
  return queryOptions({
    queryKey: ["character", id] as const,
    queryFn: ({ signal }) => {
      if (id === undefined) throw new Error("id is required");
      return http.get<Character>(CHARACTER_API.byId(id), signal);
    },
    enabled: id !== undefined,
  });
}
