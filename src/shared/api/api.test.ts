import { describe, it, expect, vi } from 'vitest';
import { APIService, API_CONFIG } from './api';

describe('APIService', () => {
  describe('buildQueryString', () => {
    it('should return empty string when no filters', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ info: {}, results: [] }),
      } as Response);

      await APIService.fetchCharacters();

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.character}?`
      );
    });

    it('should build query string with single filter', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ info: {}, results: [] }),
      } as Response);

      await APIService.fetchCharacters({ name: 'rick' });

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.character}?name=rick`
      );
    });

    it('should build query string with multiple filters', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ info: {}, results: [] }),
      } as Response);

      await APIService.fetchCharacters({
        name: 'rick',
        status: 'alive',
        page: 1,
      });

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.character}?name=rick&status=alive&page=1`
      );
    });

    it('should skip undefined and empty string values', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ info: {}, results: [] }),
      } as Response);

      await APIService.fetchCharacters({
        name: 'rick',
        status: undefined,
        type: '',
        page: 1,
      });

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.character}?name=rick&page=1`
      );
    });
  });

  describe('fetchCharacters', () => {
    it('should return characters data on success', async () => {
      const mockData = { results: [{ name: 'Rick' }] };

      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response);

      const result = await APIService.fetchCharacters();

      expect(result).toEqual(mockData);
    });

    it('should throw error when fetch fails', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Not found' }),
      } as Response);

      await expect(APIService.fetchCharacters()).rejects.toThrow();
    });
  });
});
