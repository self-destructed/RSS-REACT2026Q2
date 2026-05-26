import { useState } from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { useCharacters } from "@entities/character";
import { updateSearchParams } from "@shared/lib";
import type { Character } from "@entities/character";
import { CharactersPage } from "./characters-page";

vi.mock("@shared/lib", () => ({
  updateSearchParams: vi.fn(
    (prev: URLSearchParams, params: Record<string, string | null>) => {
      const next = new URLSearchParams(prev);
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) next.delete(key);
        else next.set(key, value);
      });
      return next;
    },
  ),
  useLocalStorage: vi.fn((_: string, initial: string) => {
    const [value, setValue] = useState(initial);
    return [value, setValue];
  }),
}));

vi.mock("@shared/ui", () => ({
  MatchState: ({
    state,
    loading,
    error,
    children,
  }: {
    state: { status: string; data?: unknown; error?: Error };
    loading?: React.ReactNode;
    error?: (e: Error) => React.ReactNode;
    children: (data: unknown) => React.ReactNode;
  }) => {
    if (state.status === "loading") return loading ?? null;
    if (state.status === "error") return error?.(state.error!) ?? null;
    if (state.status === "success") return children(state.data);
    return null;
  },
  Main: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="main">{children}</main>
  ),
  Search: ({
    onSubmit,
    query,
  }: {
    onSubmit: (q: string) => void;
    query: string;
  }) => (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit("test-query");
      }}
      data-testid="search"
    >
      <input value={query || ""} readOnly />
      <button type="submit">Search</button>
    </form>
  ),
  Spinner: () => <div role="status" data-testid="spinner" />,
  Pagination: ({
    onPrev,
    onNext,
    currentPage,
    totalPages,
  }: {
    onPrev: () => void;
    onNext: () => void;
    currentPage: number;
    totalPages: number;
  }) => (
    <nav role="navigation" data-testid="pagination">
      <button type="button" onClick={onPrev} data-testid="prev">
        Prev
      </button>
      <span>
        {currentPage}/{totalPages}
      </span>
      <button type="button" onClick={onNext} data-testid="next">
        Next
      </button>
    </nav>
  ),
  ErrorDisplay: ({ message }: { message: string }) => (
    <div role="alert" data-testid="error">
      {message}
    </div>
  ),
  Flyout: () => null,
}));

vi.mock("@features/characters", () => ({
  CharacterList: ({
    data,
    onSelect,
  }: {
    data: Character[];
    onSelect: (id: number) => void;
  }) => (
    <ul data-testid="character-list">
      {data.map((char) => (
        <li key={char.id}>
          <button
            type="button"
            onClick={() => {
              onSelect(char.id);
            }}
          >
            {char.name}
          </button>
        </li>
      ))}
    </ul>
  ),
  downloadCsv: vi.fn(),
  useSelectedIds: vi.fn(() => [] as number[]),
  useToggleCharacter: vi.fn(() => vi.fn()),
  useUnselectAllCharacters: vi.fn(() => vi.fn()),
  Flyout: () => null,
}));

vi.mock("@entities/character", () => ({
  useCharacters: vi.fn(),
}));

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  },
];

const renderComponent = (initialEntries?: string[]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <CharactersPage />
    </MemoryRouter>,
  );

describe("render", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render search and main elements", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "loading",
    });

    renderComponent();

    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });

  it("should render spinner on loading", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "loading",
    });

    renderComponent();

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByTestId("character-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  it("should render nothing on idle state", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "idle",
    });

    renderComponent();

    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    expect(screen.queryByTestId("character-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("should render list after successful load", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: {
        results: mockCharacters,
        info: { count: 2, pages: 1, next: null, prev: null },
      },
    });

    renderComponent();

    expect(screen.getByTestId("character-list")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("should render error after failed load", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "error",
      error: new Error("Not found"),
    });

    renderComponent();

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });

  it("should render pagination on success", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: {
        results: mockCharacters,
        info: { count: 2, pages: 5, next: null, prev: null },
      },
    });

    renderComponent();

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByText("1/5")).toBeInTheDocument();
  });
});

describe("behavior", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should not call onPrev on first page", async () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: {
        results: mockCharacters,
        info: { count: 2, pages: 5, next: null, prev: null },
      },
    });

    renderComponent();

    const spy = vi.mocked(updateSearchParams);
    const user = userEvent.setup();
    await user.click(screen.getByTestId("prev"));

    expect(spy).not.toHaveBeenCalled();
  });

  it("should call onPrev when page is not first", async () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: {
        results: mockCharacters,
        info: { count: 2, pages: 5, next: null, prev: null },
      },
    });

    renderComponent(["/?page=2"]);

    const spy = vi.mocked(updateSearchParams);
    const user = userEvent.setup();
    await user.click(screen.getByTestId("prev"));

    expect(spy).toHaveBeenCalledWith(expect.any(URLSearchParams), {
      page: "1",
    });
  });

  it("should call onNext when next button clicked", async () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: {
        results: mockCharacters,
        info: { count: 2, pages: 5, next: null, prev: null },
      },
    });

    renderComponent();

    const spy = vi.mocked(updateSearchParams);
    const user = userEvent.setup();
    await user.click(screen.getByTestId("next"));

    expect(spy).toHaveBeenCalledWith(expect.any(URLSearchParams), {
      page: "2",
    });
  });
});
