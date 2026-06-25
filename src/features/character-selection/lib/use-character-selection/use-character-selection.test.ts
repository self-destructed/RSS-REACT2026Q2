import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCharacterSelection } from "./use-character-selection";

const { mockSelectedIds, mockToggleCharacter, mockUnselectAllCharacters } =
  vi.hoisted(() => ({
    mockSelectedIds: { current: [1, 2, 3] },
    mockToggleCharacter: vi.fn(),
    mockUnselectAllCharacters: vi.fn(),
  }));

vi.mock("@features/character-selection/model/store", () => ({
  useSelectedIds: () => mockSelectedIds.current,
  useToggleCharacter: () => mockToggleCharacter,
  useUnselectAllCharacters: () => mockUnselectAllCharacters,
}));

afterEach(() => {
  mockSelectedIds.current = [1, 2, 3];
  vi.clearAllMocks();
});

describe("useCharacterSelection", () => {
  it("selectedIds comes from useSelectedIds mock", () => {
    const { result } = renderHook(() => useCharacterSelection());

    expect(result.current.selectedIds).toEqual([1, 2, 3]);
  });

  it("toggleSelection comes from useToggleCharacter mock", () => {
    const { result } = renderHook(() => useCharacterSelection());

    expect(result.current.toggleSelection).toBe(mockToggleCharacter);
  });

  it("unselectAll comes from useUnselectAllCharacters mock", () => {
    const { result } = renderHook(() => useCharacterSelection());

    expect(result.current.unselectAll).toBe(mockUnselectAllCharacters);
  });

  it("handleDownload is a function", () => {
    const { result } = renderHook(() => useCharacterSelection());

    expect(typeof result.current.handleDownload).toBe("function");
  });

  describe("handleDownload", () => {
    it("opens CSV route with selectedIds", () => {
      const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
      const { result } = renderHook(() => useCharacterSelection());

      result.current.handleDownload();

      expect(openSpy).toHaveBeenCalledWith(
        "/api/csv/characters?ids=1,2,3",
        "_self",
      );
      openSpy.mockRestore();
    });

    it("returns early when selectedIds is empty", () => {
      const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
      mockSelectedIds.current = [];

      const { result } = renderHook(() => useCharacterSelection());

      result.current.handleDownload();

      expect(openSpy).not.toHaveBeenCalled();
      openSpy.mockRestore();
    });
  });
});
