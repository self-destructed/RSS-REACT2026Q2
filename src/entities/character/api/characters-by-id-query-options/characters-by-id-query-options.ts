import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { Character, CharacterId } from "../../model";
import { API_BASE_URL, http } from "@shared/api";

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
      return http.get<Character[]>(
        `${API_BASE_URL}/character/${sortedIds.join(",")},`,
        signal,
      );
    },
    enabled: ids.length > 0,
  });
}
