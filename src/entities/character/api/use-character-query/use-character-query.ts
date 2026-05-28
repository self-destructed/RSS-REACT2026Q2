import {
  queryOptions,
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { Character, CharacterId } from "../../model";
import { CHARACTER_API } from "../character-api";
import { http } from "@shared/api";

export function characterQueryOptions(
  id: CharacterId | undefined,
): UseQueryOptions<
  Character,
  Error,
  Character,
  readonly ["character", CharacterId | undefined]
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
  id: CharacterId | undefined,
): UseQueryResult<Character> {
  return useQuery(characterQueryOptions(id));
}
