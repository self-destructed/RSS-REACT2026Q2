import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { useCharacterNavigation } from "./use-character-navigation";

const { mockUsePrefetchAdjacentPages } = vi.hoisted(() => ({
  mockUsePrefetchAdjacentPages: vi.fn(),
}));

vi.mock("../use-prefetch-adjacent-pages", () => ({
  usePrefetchAdjacentPages: mockUsePrefetchAdjacentPages,
}));

function LocationSpy() {
  const location = useLocation();

  return <div data-testid="location">{location.search}</div>;
}

function getSearchParams() {
  const search = screen.getByTestId("location").textContent || "";

  return new URLSearchParams(search);
}

function createWrapper(initialEntry = "/") {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialEntry]}>
        <LocationSpy />
        {children}
      </MemoryRouter>
    );
  }
  return Wrapper;
}

beforeEach(() => {
  mockUsePrefetchAdjacentPages.mockClear();
});

describe("useCharacterNavigation", () => {
  it("returns page 1 when no page param and no initialPage", () => {
    renderHook(() => useCharacterNavigation({ totalPages: 10, name: "" }), {
      wrapper: createWrapper("/"),
    });

    expect(getSearchParams().get("page")).toBe("1");
  });

  it("writes page=1 to URL when page param is missing", () => {
    renderHook(() => useCharacterNavigation({ totalPages: 10, name: "" }), {
      wrapper: createWrapper("/"),
    });

    expect(getSearchParams().get("page")).toBe("1");
  });

  it("returns initialPage when provided without page param", () => {
    renderHook(
      () =>
        useCharacterNavigation({ totalPages: 10, name: "", initialPage: 3 }),
      { wrapper: createWrapper("/") },
    );

    expect(getSearchParams().get("page")).toBe("3");
  });

  it("reads page from URL params", () => {
    renderHook(() => useCharacterNavigation({ totalPages: 10, name: "" }), {
      wrapper: createWrapper("/?page=5"),
    });

    expect(getSearchParams().get("page")).toBe("5");
  });

  it("handlePrev decrements page", () => {
    const { result } = renderHook(
      () => useCharacterNavigation({ totalPages: 10, name: "" }),
      { wrapper: createWrapper("/?page=5") },
    );

    act(() => {
      result.current.handlePrev();
    });

    expect(getSearchParams().get("page")).toBe("4");
  });

  it("handlePrev does not go below 1", () => {
    const { result } = renderHook(
      () => useCharacterNavigation({ totalPages: 10, name: "" }),
      { wrapper: createWrapper("/?page=1") },
    );

    act(() => {
      result.current.handlePrev();
    });

    expect(getSearchParams().get("page")).toBe("1");
  });

  it("handleNext increments page", () => {
    const { result } = renderHook(
      () => useCharacterNavigation({ totalPages: 10, name: "" }),
      { wrapper: createWrapper("/?page=1") },
    );

    act(() => {
      result.current.handleNext();
    });

    expect(getSearchParams().get("page")).toBe("2");
  });

  it("handleNext does not exceed totalPages", () => {
    const { result } = renderHook(
      () => useCharacterNavigation({ totalPages: 10, name: "" }),
      { wrapper: createWrapper("/?page=10") },
    );

    act(() => {
      result.current.handleNext();
    });

    expect(getSearchParams().get("page")).toBe("10");
  });

  it("setPage clamps to valid range", () => {
    const { result } = renderHook(
      () => useCharacterNavigation({ totalPages: 10, name: "" }),
      { wrapper: createWrapper("/?page=10") },
    );

    act(() => {
      result.current.setPage(15);
    });

    expect(getSearchParams().get("page")).toBe("10");

    act(() => {
      result.current.setPage(-1);
    });

    expect(getSearchParams().get("page")).toBe("1");
  });

  it("calls usePrefetchAdjacentPages with correct params", () => {
    renderHook(() => useCharacterNavigation({ totalPages: 10, name: "" }), {
      wrapper: createWrapper("/?page=10"),
    });

    expect(mockUsePrefetchAdjacentPages).toHaveBeenCalledWith({
      page: 10,
      name: "",
      totalPages: 10,
    });
  });
});
