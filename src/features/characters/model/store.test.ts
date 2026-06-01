import { describe, expect, it, vi, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";

const mockStorage = vi.hoisted(() => {
  const createMock = (): Storage => {
    const store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      get length() {
        return 0;
      },
    };
  };
  const s = createMock();
  vi.stubGlobal("localStorage", s);
  return s;
});

import {
  useSelectedCharactersStore,
  useSelectedIds,
  useToggleCharacter,
  useUnselectAllCharacters,
} from "./store";

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

  describe("selector hooks", () => {
    it("useSelectedIds returns selectedIds", () => {
      const { result } = renderHook(() => useSelectedIds());

      act(() => {
        useSelectedCharactersStore.setState({ selectedIds: [1, 2] });
      });

      expect(result.current).toEqual([1, 2]);
    });

    it("useToggleCharacter returns toggle function", () => {
      const { result } = renderHook(() => useToggleCharacter());

      result.current(42);

      expect(useSelectedCharactersStore.getState().selectedIds).toContain(42);
    });

    it("useUnselectAllCharacters returns unselectAll function", () => {
      useSelectedCharactersStore.setState({ selectedIds: [1, 2, 3] });

      const { result } = renderHook(() => useUnselectAllCharacters());

      result.current();

      expect(useSelectedCharactersStore.getState().selectedIds).toEqual([]);
    });
  });
});
