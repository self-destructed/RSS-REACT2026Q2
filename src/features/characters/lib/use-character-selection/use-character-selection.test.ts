import { describe, it, expect, vi, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCharacterSelection } from "./use-character-selection";

const {
  mockSelectedIds,
  mockToggleCharacter,
  mockUnselectAllCharacters,
  mockFetchQuery,
  mockCharactersByIdQueryOptions,
  mockMapCharacterToCSVObject,
  mockCHARACTER_CSV_COLUMNS,
  mockDownloadCSV,
} = vi.hoisted(() => {
  const mockCharacters = [
    { id: 1, name: "Rick" },
    { id: 2, name: "Morty" },
    { id: 3, name: "Summer" },
  ];

  return {
    mockSelectedIds: { current: [1, 2, 3] },
    mockToggleCharacter: vi.fn(),
    mockUnselectAllCharacters: vi.fn(),
    mockCharacters,
    mockFetchQuery: vi.fn().mockResolvedValue(mockCharacters),
    mockCharactersByIdQueryOptions: vi.fn(
      (ids: number[]) => `query-options-${ids.join(",")}`,
    ),
    mockMapCharacterToCSVObject: vi.fn((c: { id: number; name: string }) => ({
      name: c.name,
      csvId: c.id,
    })),
    mockCHARACTER_CSV_COLUMNS: ["col1", "col2"],
    mockDownloadCSV: vi.fn(),
  };
});

vi.mock("@features/characters/model/store", () => ({
  useSelectedIds: () => mockSelectedIds.current,
  useToggleCharacter: () => mockToggleCharacter,
  useUnselectAllCharacters: () => mockUnselectAllCharacters,
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    fetchQuery: mockFetchQuery,
  }),
}));

vi.mock("@entities/character", () => ({
  charactersByIdQueryOptions: mockCharactersByIdQueryOptions,
  mapCharacterToCSVObject: mockMapCharacterToCSVObject,
  CHARACTER_CSV_COLUMNS: mockCHARACTER_CSV_COLUMNS,
}));

vi.mock("@shared/lib", () => ({
  downloadCSV: mockDownloadCSV,
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
    it("calls charactersByIdQueryOptions with selectedIds and passes result to fetchQuery", async () => {
      const { result } = renderHook(() => useCharacterSelection());

      await act(() => result.current.handleDownload());

      expect(mockCharactersByIdQueryOptions).toHaveBeenCalledWith([1, 2, 3]);
      expect(mockFetchQuery).toHaveBeenCalledWith("query-options-1,2,3");
    });

    it("calls mapCharacterToCSVObject for each character", async () => {
      const { result } = renderHook(() => useCharacterSelection());

      await act(() => result.current.handleDownload());

      expect(mockMapCharacterToCSVObject).toHaveBeenCalledTimes(3);
      expect(mockMapCharacterToCSVObject.mock.calls[0][0]).toEqual({
        id: 1,
        name: "Rick",
      });
      expect(mockMapCharacterToCSVObject.mock.calls[1][0]).toEqual({
        id: 2,
        name: "Morty",
      });
      expect(mockMapCharacterToCSVObject.mock.calls[2][0]).toEqual({
        id: 3,
        name: "Summer",
      });
    });

    it("calls downloadCSV with mapped rows, columns, and filename", async () => {
      const { result } = renderHook(() => useCharacterSelection());

      await act(() => result.current.handleDownload());

      expect(mockDownloadCSV).toHaveBeenCalledWith(
        [
          { name: "Rick", csvId: 1 },
          { name: "Morty", csvId: 2 },
          { name: "Summer", csvId: 3 },
        ],
        ["col1", "col2"],
        "3_items.csv",
      );
    });

    it("returns early when selectedIds is empty", async () => {
      mockSelectedIds.current = [];
      const { result } = renderHook(() => useCharacterSelection());

      await act(() => result.current.handleDownload());

      expect(mockFetchQuery).not.toHaveBeenCalled();
      expect(mockDownloadCSV).not.toHaveBeenCalled();
    });
  });
});
