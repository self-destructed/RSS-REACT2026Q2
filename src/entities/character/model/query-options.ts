import { queryOptions, type UseQueryOptions } from "@tanstack/react-query";
import type { Character, CharacterId, CharacterFilter } from "./types";
import { CHARACTER_API } from "../api/character-api";
import { API_BASE_URL, http, type Info } from "@shared/api";
import { buildQueryString } from "@shared/lib/url-params/url-params";

// ─── Single character ────────────────────────────────────────

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

// ─── Character list (paginated, filtered) ────────────────────

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

// ─── Characters by IDs (bulk fetch) ──────────────────────────

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
