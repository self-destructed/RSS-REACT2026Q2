import type { Character } from "@shared/api";
import { API_BASE_URL, API_ENDPOINTS } from "@shared/constants";

export async function fetchCharacters(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];

  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.character}/${ids.join(",")},`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.statusText}`);
    }

    return (await response.json()) as Character[];
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error while fetching characters",
    );
  }
}
