import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { Character, CharacterId } from "../../model";
import { CHARACTER_API } from "../character-api";
import { http } from "@shared/api";

export function charactersByIdQueryOptions(
  ids: CharacterId[],
): UseQueryOptions<
  Character[],
  Error,
  Character[],
  readonly ["charactersByIds", CharacterId[]]
> {
  const sortedIds = [...ids].sort((a, b) => a - b);
  return queryOptions({
    queryKey: ["charactersByIds", sortedIds] as const,
    queryFn: ({ signal }) => {
      return http.get<Character[]>(CHARACTER_API.byIds(sortedIds), signal);
    },
    enabled: ids.length > 0,
  });
}
