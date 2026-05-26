import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(
        `Error while reading from localStorage key "${key}":`,
        error,
      );
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error while writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      setStoredValue((prev) =>
        value instanceof Function ? value(prev) : value,
      );
    } catch (error) {
      console.warn(`Error while updating localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}
