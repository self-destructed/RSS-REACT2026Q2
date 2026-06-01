import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook, screen, waitFor } from "@testing-library/react";
import {
  MemoryRouter,
  useLocation,
  type MemoryRouterProps,
} from "react-router";
import { useCharacterSearch } from "./use-character-search";

function LocationSpy() {
  const location = useLocation();

  return <div data-testid="location">{location.search}</div>;
}

function getSearchParams() {
  const search = screen.getByTestId("location").textContent || "";

  return new URLSearchParams(search);
}

function createWrapper(props: MemoryRouterProps = {}) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter {...props}>
        <LocationSpy />
        {children}
      </MemoryRouter>
    );
  };
}

function renderSearchHook(initialEntry = "/") {
  const wrapper = createWrapper({ initialEntries: [initialEntry] });

  return renderHook(() => useCharacterSearch({ lsKey: "search" }), { wrapper });
}

let mockSavedQuery = "";
const mockSetSavedQuery = vi.fn((val: string) => {
  mockSavedQuery = val;
});

vi.mock("@shared/lib", () => ({
  useLocalStorage: (_key: string, initial: string) => [
    mockSavedQuery || initial,
    mockSetSavedQuery,
  ],
}));

describe("useCharacterSearch", () => {
  beforeEach(() => {
    mockSavedQuery = "";
    mockSetSavedQuery.mockClear();
  });

  it("reads query from URL params", () => {
    const { result } = renderSearchHook("/characters?name=rick");

    expect(result.current.query).toBe("rick");
  });

  it("reads query from localStorage when URL has no name", () => {
    mockSavedQuery = "morty";
    const { result } = renderSearchHook("/");

    expect(result.current.query).toBe("morty");
  });

  it("prefers URL param over localStorage value", () => {
    mockSavedQuery = "morty";
    const { result } = renderSearchHook("/?name=rick");

    expect(result.current.query).toBe("rick");
  });

  it("updates URL and localStorage when query changes", async () => {
    const { result } = renderSearchHook("/");

    act(() => {
      result.current.handleQueryChange("rick");
    });

    expect(mockSetSavedQuery).toHaveBeenCalledWith("rick");

    await waitFor(() => {
      expect(getSearchParams().get("name")).toBe("rick");
    });
  });

  it("restores URL param from localStorage", async () => {
    mockSavedQuery = "morty";
    renderSearchHook("/");

    await waitFor(() => {
      expect(getSearchParams().get("name")).toBe("morty");
    });
  });

  it("removes name param when query is cleared", async () => {
    const { result } = renderSearchHook("/?name=rick");

    act(() => {
      result.current.handleQueryChange("");
    });

    await waitFor(() => {
      expect(getSearchParams().has("name")).toBe(false);
    });
  });

  it("removes name param when param is empty", async () => {
    renderSearchHook("/?name=&page=2");

    await waitFor(() => {
      expect(getSearchParams().has("name")).toBe(false);
    });
  });
});
