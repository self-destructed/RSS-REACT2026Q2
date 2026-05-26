import { describe, expect, it, vi, afterEach } from "vitest";

const mockStorage = vi.hoisted(() => {
  const createMock = (): Storage => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        const { [key]: _, ...rest } = store;
        store = rest;
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
      get length() {
        return Object.keys(store).length;
      },
    };
  };
  const s = createMock();
  vi.stubGlobal("localStorage", s);
  return s;
});

import { useSelectedCharactersStore } from "./store";

describe("selectedCharactersStore", () => {
  afterEach(() => {
    useSelectedCharactersStore.setState({ selectedIds: [] });
  });

  describe("initial state", () => {
    it("selectedIds is empty", () => {
      const { selectedIds } = useSelectedCharactersStore.getState();

      expect(selectedIds).toEqual([]);
    });
  });

  describe("toggle", () => {
    it("adds id when not selected", () => {
      useSelectedCharactersStore.getState().toggle(1);

      const { selectedIds } = useSelectedCharactersStore.getState();
      expect(selectedIds).toEqual([1]);
    });

    it("removes id when already selected", () => {
      useSelectedCharactersStore.setState({ selectedIds: [1, 2] });
      useSelectedCharactersStore.getState().toggle(1);

      const { selectedIds } = useSelectedCharactersStore.getState();
      expect(selectedIds).toEqual([2]);
    });
  });

  describe("unselectAll", () => {
    it("clears all selected ids", () => {
      useSelectedCharactersStore.setState({ selectedIds: [1, 2, 3] });
      useSelectedCharactersStore.getState().unselectAll();

      const { selectedIds } = useSelectedCharactersStore.getState();
      expect(selectedIds).toEqual([]);
    });

    it("does nothing when already empty", () => {
      useSelectedCharactersStore.getState().unselectAll();

      const { selectedIds } = useSelectedCharactersStore.getState();
      expect(selectedIds).toEqual([]);
    });
  });

  describe("persistence", () => {
    it("saves state to localStorage", () => {
      useSelectedCharactersStore.getState().toggle(42);

      const stored = mockStorage.getItem("selected-characters");
      expect(stored).toBeTruthy();
    });
  });
});
