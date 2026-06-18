import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrefetchAdjacentPages } from "./use-prefetch-adjacent-pages";
const mockPrefetchQuery = vi.fn();
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    prefetchQuery: mockPrefetchQuery,
  }),
}));

vi.mock("@entities/character", () => ({
  charactersQueryOptions: (opts: { name: string; page: number }) => ({
    queryKey: ["characters", opts],
    queryFn: vi.fn(),
  }),
}));

describe("usePrefetchAdjacentPages", () => {
  beforeEach(() => {
    mockPrefetchQuery.mockClear();
  });

  it("prefetches next page when on first page", () => {
    renderHook(() => {
      usePrefetchAdjacentPages({ name: "", page: 1, totalPages: 5 });
    });

    expect(mockPrefetchQuery).toHaveBeenCalledTimes(1);
    expect(mockPrefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["characters", { name: "", page: 2 }],
      }),
    );
  });

  it("prefetches previous page when on last page", () => {
    renderHook(() => {
      usePrefetchAdjacentPages({ name: "", page: 5, totalPages: 5 });
    });

    expect(mockPrefetchQuery).toHaveBeenCalledTimes(1);
    expect(mockPrefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["characters", { name: "", page: 4 }],
      }),
    );
  });

  it("prefetches both adjacent pages when in the middle", () => {
    renderHook(() => {
      usePrefetchAdjacentPages({ name: "", page: 3, totalPages: 5 });
    });

    expect(mockPrefetchQuery).toHaveBeenCalledTimes(2);
    expect(mockPrefetchQuery).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        queryKey: ["characters", { name: "", page: 2 }],
      }),
    );
    expect(mockPrefetchQuery).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        queryKey: ["characters", { name: "", page: 4 }],
      }),
    );
  });

  it("does not prefetch when page is out of range", () => {
    renderHook(() => {
      usePrefetchAdjacentPages({ name: "", page: 0, totalPages: 5 });
    });

    expect(mockPrefetchQuery).not.toHaveBeenCalled();
  });

  it("passes name filter to prefetchQuery", () => {
    renderHook(() => {
      usePrefetchAdjacentPages({ name: "rick", page: 1, totalPages: 5 });
    });

    expect(mockPrefetchQuery).toHaveBeenCalledTimes(1);
    expect(mockPrefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["characters", { name: "rick", page: 2 }],
      }),
    );
  });
});
