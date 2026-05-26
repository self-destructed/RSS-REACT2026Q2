import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharacterDetailPage } from "./character-detail";
import { useCharacter } from "@features/characters";
import { useParams, useOutletContext } from "react-router";

afterEach(cleanup);

vi.mock("react-router", () => ({
  useParams: vi.fn<() => { id?: string }>(),
  useOutletContext: vi.fn<() => { onClose: () => void }>(),
}));

vi.mock("@features/characters", () => ({
  useCharacter: vi.fn<() => { status: string }>(),
}));

vi.mock("@entities/character", () => ({
  CharacterDetail: ({ character }: { character: { name: string } }) => (
    <div data-testid="character-detail">{character.name}</div>
  ),
}));

vi.mock("@shared/ui", () => ({
  Spinner: () => <div data-testid="spinner" />,
  Sidebar: ({
    onClose,
    children,
  }: {
    onClose: () => void;
    children: React.ReactNode;
  }) => (
    <div data-testid="sidebar">
      <button type="button" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <div data-testid="sidebar-content">{children}</div>
    </div>
  ),
}));

const mockOnClose = vi.fn();

describe("CharacterDetailPage", () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: "1" });
    vi.mocked(useOutletContext).mockReturnValue({ onClose: mockOnClose });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render spinner on loading", () => {
    vi.mocked(useCharacter).mockReturnValue({ status: "loading" } as never);

    render(<CharacterDetailPage />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("should render error message on error", () => {
    vi.mocked(useCharacter).mockReturnValue({
      status: "error",
      error: new Error("Not found"),
    } as never);

    render(<CharacterDetailPage />);

    expect(screen.getByText("Error: Not found")).toBeInTheDocument();
  });

  it("should render CharacterDetail on success", () => {
    vi.mocked(useCharacter).mockReturnValue({
      status: "success",
      data: { id: 1, name: "Rick Sanchez" },
    } as never);

    render(<CharacterDetailPage />);

    expect(screen.getByTestId("character-detail")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("should render nothing in idle state", () => {
    vi.mocked(useParams).mockReturnValue({});
    vi.mocked(useCharacter).mockReturnValue({ status: "idle" } as never);

    render(<CharacterDetailPage />);

    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    expect(screen.queryByTestId("character-detail")).not.toBeInTheDocument();
  });

  it("should call onClose when close button clicked", async () => {
    vi.mocked(useCharacter).mockReturnValue({ status: "loading" } as never);

    render(<CharacterDetailPage />);

    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Close"));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
