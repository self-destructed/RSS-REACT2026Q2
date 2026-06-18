"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Character, CharacterFilter, CharacterId } from "./types";
import type { Info } from "@shared/api";
import { characterQueryOptions, charactersQueryOptions } from "./query-options";

// ─── Single character ────────────────────────────────────────

export function useCharacterQuery(
  id: CharacterId | undefined,
): UseQueryResult<Character> {
  return useQuery(characterQueryOptions(id));
}

// ─── Character list (paginated, filtered) ────────────────────

export function useCharactersQuery(
  filters?: CharacterFilter,
  initialData?: Info<Character[]>,
): UseQueryResult<Info<Character[]>> {
  return useQuery({
    ...charactersQueryOptions(filters),
    initialData,
  });
}
