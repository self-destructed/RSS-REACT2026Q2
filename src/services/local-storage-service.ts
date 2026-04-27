export class LocaltorageService {
  static set<T>(key: string, data: T): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }

  static get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const serialized = localStorage.getItem(key);
      if (!serialized) return defaultValue;
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage key "${key}":`, error);
    }
  }

  static has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  static getAllKeys(): string[] {
    return Object.keys(localStorage);
  }
}
