import {
  queryOptions,
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { CharacterFilter, Character } from "../../model";
import { CHARACTER_API } from "../character-api";
import { http, type Info } from "@shared/api";
import { buildQueryString } from "@shared/lib/url-params/url-params";

export function charactersQueryOptions(
  filters?: CharacterFilter,
): UseQueryOptions<
  Info<Character[]>,
  Error,
  Info<Character[]>,
  readonly ["characters", CharacterFilter | object]
> {
  return queryOptions({
    queryKey: ["characters", filters ?? {}] as const,
    queryFn: ({ signal }) => {
      const url = `${CHARACTER_API.list}?${buildQueryString(filters ?? null)}`;
      return http.get<Info<Character[]>>(url, signal);
    },
  });
}

export function useCharactersQuery(
  filters?: CharacterFilter,
  initialData?: Info<Character[]>,
): UseQueryResult<Info<Character[]>> {
  return useQuery({
    ...charactersQueryOptions(filters),
    initialData,
  });
}
