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
