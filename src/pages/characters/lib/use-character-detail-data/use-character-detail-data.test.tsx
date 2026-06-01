import { describe, it, vi, beforeEach, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
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

let mockParams: { id?: string } = {};

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: () => mockParams,
  };
});

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

describe("useCharacterDetailData", () => {
  beforeEach(() => {
    mockParams = {};
    mockInvalidateQueries.mockClear();
    mockUseCharacterQuery.mockClear();
    mockCharacterQueryOptions.mockClear();
  });

  it("returns characterId from URL params", () => {
    mockParams = { id: "42" };
    const { result } = renderHook(() => useCharacterDetailData());

    expect(result.current.characterId).toBe(42);
  });

  it("returns undefined characterId when no id in params", () => {
    const { result } = renderHook(() => useCharacterDetailData());

    expect(result.current.characterId).toBeUndefined();
  });

  it("passes characterId to useCharacterQuery", () => {
    mockParams = { id: "42" };
    renderHook(() => useCharacterDetailData());

    expect(mockUseCharacterQuery).toHaveBeenCalledWith(42);
  });

  it("calls invalidateQueries with correct queryKey on handleRefresh", () => {
    mockParams = { id: "42" };
    mockCharacterQueryOptions.mockReturnValue({
      queryKey: ["character", "42"],
    });

    const { result } = renderHook(() => useCharacterDetailData());

    act(() => {
      result.current.handleRefresh();
    });

    expect(mockCharacterQueryOptions).toHaveBeenCalledWith(42);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ["character", "42"],
    });
  });

  it("handles invalid id as undefined", () => {
    mockParams = { id: "abc" };
    const { result } = renderHook(() => useCharacterDetailData());

    expect(result.current.characterId).toBeUndefined();
  });
});
