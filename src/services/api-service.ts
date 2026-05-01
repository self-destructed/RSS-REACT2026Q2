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

      const data = (await response.json()) as Info<Character[]> & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || `API error: ${response.status}.`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('unknown error occurred!');
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
