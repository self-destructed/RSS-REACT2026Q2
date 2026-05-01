import type { Character, CharacterFilter, Info } from './api-interfaces';

export const API_CONFIG = {
  baseUrl: 'https://rickandmortyapi.com/api',
  endpoints: {
    character: '/character',
    location: '/location',
    episode: '/episode',
  },
} as const;

export class APIService {
  public static async fetchCharacters(
    filters?: CharacterFilter
  ): Promise<Info<Character[]>> {
    const queryParams = this.buildQueryString(filters);

    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.character}?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}. No characters found!`);
      }

      const data = (await response.json()) as Info<Character[]>;

      return data;
    } catch {
      throw new Error('Failed to fetch characters!');
    }
  }

  private static buildQueryString(filters?: CharacterFilter): string {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    return params.toString();
  }
}
