import { useState, useEffect } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!localStorage) {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(
        `Error while reading from localStorage key "${key}":`,
        error
      );
      return initialValue;
    }
  });

  useEffect(() => {
    if (!localStorage) return;

    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error while writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(`Error while updating localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
