import { describe, it, vi, beforeEach, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { useCharacterDetailData } from "./use-character-detail-data";

const {
  mockUseCharacterQuery,
  mockCharacterQueryOptions,
  mockInvalidateQueries,
} = vi.hoisted(() => ({
  mockUseCharacterQuery: vi.fn(),
  mockCharacterQueryOptions: vi.fn(),
  mockInvalidateQueries: vi.fn(),
}));

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");

  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: mockInvalidateQueries,
    }),
  };
});

vi.mock("@entities/character", () => ({
  useCharacterQuery: mockUseCharacterQuery,
  characterQueryOptions: mockCharacterQueryOptions,
}));

function wrapper(initialRoute: string) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/characters/details/:id" element={children} />
          <Route path="*" element={children} />
        </Routes>
      </MemoryRouter>
    );
  }

  return Wrapper;
}

describe("useCharacterDetailData", () => {
  beforeEach(() => {
    mockInvalidateQueries.mockClear();
    mockUseCharacterQuery.mockClear();
    mockCharacterQueryOptions.mockClear();
  });

  it("reads characterId from route params", () => {
    const { result } = renderHook(() => useCharacterDetailData(), {
      wrapper: wrapper("/characters/details/42"),
    });

    expect(result.current.characterId).toBe(42);
  });

  it("returns undefined when id is missing", () => {
    const { result } = renderHook(() => useCharacterDetailData(), {
      wrapper: wrapper("/characters/details"),
    });

    expect(result.current.characterId).toBeUndefined();
  });

  it("calls useCharacterQuery with parsed id", () => {
    renderHook(() => useCharacterDetailData(), {
      wrapper: wrapper("/characters/details/42"),
    });

    expect(mockUseCharacterQuery).toHaveBeenCalledWith(42);
  });

  it("invalidates query on refresh", () => {
    mockCharacterQueryOptions.mockReturnValue({
      queryKey: ["character", "42"],
    });

    const { result } = renderHook(() => useCharacterDetailData(), {
      wrapper: wrapper("/characters/details/42"),
    });

    act(() => {
      result.current.handleRefresh();
    });

    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ["character", "42"],
    });
  });
});
