import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { LocaltorageService } from './local-storage';
import { createLocalStorageMock } from './__mocks__/local-storage';

describe('LocaltorageService', () => {
  let mockLocalStorage: ReturnType<typeof createLocalStorageMock>;

  beforeEach(() => {
    mockLocalStorage = createLocalStorageMock();
    vi.stubGlobal('localStorage', mockLocalStorage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('set', () => {
    it('should save data to localStorage', () => {
      LocaltorageService.set('testKey', { name: 'Test' });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        JSON.stringify({ name: 'Test' })
      );
    });

    it('should handle errors silently', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });

      LocaltorageService.set('testKey', 'value');

      vi.restoreAllMocks();
    });
  });

  describe('get', () => {
    it('should return parsed data from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('{"name":"Test"}');

      const result = LocaltorageService.get<{ name: string }>('testKey');

      expect(result).toEqual({ name: 'Test' });
    });

    it('should return defaultValue when key not found', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = LocaltorageService.get('nonexistent', 'default');

      expect(result).toBe('default');
    });

    it('should return null when key not found and no default', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = LocaltorageService.get('nonexistent');

      expect(result).toBeNull();
    });

    it('should handle JSON parse errors and return defaultValue', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      mockLocalStorage.getItem.mockReturnValue('invalid json');

      const result = LocaltorageService.get('testKey', 'default');

      expect(result).toBe('default');

      vi.restoreAllMocks();
    });
  });

  describe('remove', () => {
    it('should remove item from localStorage', () => {
      LocaltorageService.remove('testKey');

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('testKey');
    });
  });

  describe('has', () => {
    it('should return true when key exists', () => {
      mockLocalStorage.getItem.mockReturnValue('value');

      const result = LocaltorageService.has('testKey');

      expect(result).toBe(true);
    });

    it('should return false when key does not exist', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = LocaltorageService.has('testKey');

      expect(result).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all items from localStorage', () => {
      LocaltorageService.clear();

      expect(mockLocalStorage.clear).toHaveBeenCalled();
    });
  });

  describe('getAllKeys', () => {
    it('should call Object.keys on localStorage', () => {
      const mockKeys = vi
        .spyOn(Object, 'keys')
        .mockReturnValue(['key1', 'key2']);

      const keys = LocaltorageService.getAllKeys();

      expect(mockKeys).toHaveBeenCalledWith(localStorage);
      expect(keys).toEqual(['key1', 'key2']);
      mockKeys.mockRestore();
    });
  });
});
