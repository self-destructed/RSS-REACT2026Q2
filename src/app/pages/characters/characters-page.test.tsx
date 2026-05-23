import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CharactersPage from "./characters-page";
import type { Character } from "@shared/api";

vi.mock("@shared/ui", () => ({
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
}));

vi.mock("@features/characters/ui", () => ({
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
}));

vi.mock("@shared/hooks", () => ({
  useLocalStorage: vi.fn((_: string, initial: string) => {
    let value = initial;
    return [
      value,
      (v: string) => {
        value = v;
      },
    ];
  }),
}));

vi.mock("@features/characters/hooks", () => ({
  useCharacters: vi.fn(),
}));

vi.mock("@shared/utils", () => ({
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
}));

import { useCharacters } from "@features/characters/hooks";
import { useLocalStorage } from "@shared/hooks";

afterEach(cleanup);

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

const renderComponent = () =>
  render(
    <MemoryRouter>
      <CharactersPage />
    </MemoryRouter>,
  );

describe("render", () => {
  beforeEach(() => {
    vi.mocked(useLocalStorage).mockReturnValue(["", () => {}]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render search and main elements", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "loading",
      data: { results: [], info: { pages: 1 } },
      error: null,
    } as never);

    renderComponent();

    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });

  it("should render spinner on loading", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "loading",
      data: { results: [], info: { pages: 1 } },
      error: null,
    } as never);

    renderComponent();

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByTestId("character-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  it("should render list after successful load", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: { results: mockCharacters, info: { pages: 1 } },
      error: null,
    } as never);

    renderComponent();

    expect(screen.getByTestId("character-list")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("should render error after failed load", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "error",
      data: { results: [], info: { pages: 1 } },
      error: new Error("Not found"),
    } as never);

    renderComponent();

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByText("Not found")).toBeInTheDocument();
  });

  it("should render pagination on success", () => {
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: { results: mockCharacters, info: { pages: 5 } },
      error: null,
    } as never);

    renderComponent();

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByText("1/5")).toBeInTheDocument();
  });
});

describe("behavior", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call onPrev when prev button clicked", () => {
    vi.mocked(useLocalStorage).mockReturnValue(["", () => {}]);
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: { results: mockCharacters, info: { pages: 5 } },
      error: null,
    } as never);

    renderComponent();

    screen.getByTestId("prev").click();
  });

  it("should call onNext when next button clicked", () => {
    vi.mocked(useLocalStorage).mockReturnValue(["", () => {}]);
    vi.mocked(useCharacters).mockReturnValue({
      status: "success",
      data: { results: mockCharacters, info: { pages: 5 } },
      error: null,
    } as never);

    renderComponent();

    screen.getByTestId("next").click();
  });
});
