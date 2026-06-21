import "@testing-library/jest-dom";
import { vi } from "vitest";

if (typeof globalThis.localStorage === "undefined") {
  const store: Record<string, string> = {};
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      Reflect.deleteProperty(store, key);
    },
    clear: () => {
      for (const key of Object.keys(store)) {
        Reflect.deleteProperty(store, key);
      }
    },
    key: () => null,
    get length() {
      return Object.keys(store).length;
    },
  });
}
