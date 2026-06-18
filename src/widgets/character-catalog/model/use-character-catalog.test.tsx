import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useCharacterCatalog } from "./use-character-catalog";

const {
  mockUseCharacterSearch,
  mockUseCharacterNavigation,
  mockPrefetchAdjacentPages,
  mockUseCharactersQuery,
  mockCharactersQueryOptions,
  mockInvalidateQueries,
} = vi.hoisted(() => ({
  mockUseCharacterSearch: vi.fn(),
  mockUseCharacterNavigation: vi.fn(),
  mockPrefetchAdjacentPages: vi.fn(),
  mockUseCharactersQuery: vi.fn(),
  mockCharactersQueryOptions: vi.fn(),
  mockInvalidateQueries: vi.fn(),
}));

vi.mock("./use-character-search", () => ({
  useCharacterSearch: mockUseCharacterSearch,
}));

vi.mock("./use-character-navigation", () => ({
  useCharacterNavigation: mockUseCharacterNavigation,
}));

vi.mock("./use-prefetch-adjacent-pages", () => ({
  usePrefetchAdjacentPages: mockPrefetchAdjacentPages,
}));

vi.mock("@entities/character", () => ({
  useCharactersQuery: mockUseCharactersQuery,
  charactersQueryOptions: mockCharactersQueryOptions,
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries: mockInvalidateQueries,
  }),
}));

const mockSearchHandleQueryChange = vi.fn();
const mockNavHandleNext = vi.fn();
const mockNavHandlePrev = vi.fn();
const mockNavSetPage = vi.fn();

function createWrapper(initialEntry = "/") {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
    );
  }
  return Wrapper;
}

function mockCharactersQueryData(totalPages: number) {
  return {
    data: { info: { pages: totalPages }, results: [] },
    isLoading: false,
    isError: false,
    error: null,
  };
}

describe("useCharacterCatalog", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseCharacterSearch.mockReturnValue({
      query: "",
      handleQueryChange: mockSearchHandleQueryChange,
    });

    mockUseCharacterNavigation.mockReturnValue({
      page: 1,
      handleNext: mockNavHandleNext,
      handlePrev: mockNavHandlePrev,
      setPage: mockNavSetPage,
    });

    mockUseCharactersQuery.mockReturnValue(mockCharactersQueryData(10));

    mockCharactersQueryOptions.mockImplementation((filters: unknown) => ({
      queryKey: ["characters", filters],
    }));
  });

  it("reads page from URL params", () => {
    const { result } = renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/?page=5"),
    });

    expect(result.current.page).toBe(5);
  });

  it("defaults to page 1 when no page param in URL", () => {
    const { result } = renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/"),
    });

    expect(result.current.page).toBe(1);
  });

  it("defaults to page 1 when page param is not a number", () => {
    const { result } = renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/?page=abc"),
    });

    expect(result.current.page).toBe(1);
  });

  it("passes query from search to useCharactersQuery", () => {
    mockUseCharacterSearch.mockReturnValueOnce({
      query: "rick",
      handleQueryChange: mockSearchHandleQueryChange,
    });

    renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/"),
    });

    expect(mockUseCharactersQuery).toHaveBeenCalledWith(
      expect.objectContaining({ name: "rick" }),
    );
  });

  it("passes page from URL to useCharactersQuery", () => {
    renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/?page=3"),
    });

    expect(mockUseCharactersQuery).toHaveBeenCalledWith(
      expect.objectContaining({ page: 3 }),
    );
  });

  it("passes empty name and page 1 by default", () => {
    renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/"),
    });

    expect(mockUseCharactersQuery).toHaveBeenCalledWith({
      name: "",
      page: 1,
    });
  });

  it("handleQueryChange calls search handler and resets page to 1", () => {
    const customSearchHandler = vi.fn();
    const customSetPage = vi.fn();

    mockUseCharacterSearch.mockReturnValueOnce({
      query: "old-query",
      handleQueryChange: customSearchHandler,
    });
    mockUseCharacterNavigation.mockReturnValueOnce({
      page: 5,
      handleNext: mockNavHandleNext,
      handlePrev: mockNavHandlePrev,
      setPage: customSetPage,
    });

    const { result } = renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/"),
    });

    act(() => {
      result.current.handleQueryChange("new-query");
    });

    expect(customSearchHandler).toHaveBeenCalledWith("new-query");
    expect(customSetPage).toHaveBeenCalledWith(1);
  });

  it("handleNext delegates to navigation handleNext", () => {
    const { result } = renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/"),
    });

    act(() => {
      result.current.handleNext();
    });

    expect(mockNavHandleNext).toHaveBeenCalledOnce();
  });

  it("handlePrev delegates to navigation handlePrev", () => {
    const { result } = renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/"),
    });

    act(() => {
      result.current.handlePrev();
    });

    expect(mockNavHandlePrev).toHaveBeenCalledOnce();
  });

  it("handleRefresh calls charactersQueryOptions and invalidates", () => {
    mockUseCharacterSearch.mockReturnValueOnce({
      query: "rick",
      handleQueryChange: mockSearchHandleQueryChange,
    });

    const { result } = renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/?page=3"),
    });

    act(() => {
      result.current.handleRefresh();
    });

    expect(mockCharactersQueryOptions).toHaveBeenCalledWith({
      name: "rick",
      page: 3,
    });
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ["characters", { name: "rick", page: 3 }],
    });
  });

  it("calls usePrefetchAdjacentPages with correct params", () => {
    mockUseCharacterSearch.mockReturnValueOnce({
      query: "morty",
      handleQueryChange: mockSearchHandleQueryChange,
    });
    mockUseCharactersQuery.mockReturnValueOnce(mockCharactersQueryData(20));

    renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/?page=5"),
    });

    expect(mockPrefetchAdjacentPages).toHaveBeenCalledWith({
      page: 5,
      name: "morty",
      totalPages: 20,
    });
  });

  it("passes totalPages and initialPage to useCharacterNavigation", () => {
    mockUseCharactersQuery.mockReturnValueOnce(mockCharactersQueryData(15));

    renderHook(() => useCharacterCatalog(), {
      wrapper: createWrapper("/?page=2"),
    });

    expect(mockUseCharacterNavigation).toHaveBeenCalledWith({
      totalPages: 15,
      initialPage: 2,
    });
  });
});
