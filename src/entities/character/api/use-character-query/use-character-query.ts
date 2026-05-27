import {
  queryOptions,
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { Character } from "../../model";
import { CHARACTER_API } from "../character-api";
import { http } from "@shared/api";

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

export function useCharacterQuery(
  id: string | undefined,
): UseQueryResult<Character> {
  return useQuery(characterQueryOptions(id));
}
