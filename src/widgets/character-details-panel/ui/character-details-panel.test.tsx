import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharacterDetailsPanel } from "./CharacterDetailsPanel";

const {
  mockCharacterData,
  mockHandleRefresh,
  mockOnClose,
  mockUseCharacterDetailData,
  mockCharacterDetail,
} = vi.hoisted(() => {
  const mockCharacterData = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive" as const,
    species: "Human" as const,
    gender: "Male" as const,
    type: "",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  };

  return {
    mockCharacterData,
    mockHandleRefresh: vi.fn(),
    mockOnClose: vi.fn(),
    mockUseCharacterDetailData: vi.fn(),
    mockCharacterDetail: vi.fn(
      ({ character }: { character?: { name?: string } }): React.JSX.Element => {
        if (!character) return <span hidden />;
        return (
          <div data-testid="character-detail" data-name={character.name} />
        );
      },
    ),
  };
});

vi.mock("../model", () => ({
  useCharacterDetailData: mockUseCharacterDetailData,
}));

vi.mock("@entities/character", () => ({
  CharacterDetail: mockCharacterDetail,
}));

vi.mock("react-router", () => ({
  useOutletContext: () => ({ onClose: mockOnClose }),
}));

function setDefaultState(): void {
  mockUseCharacterDetailData.mockReturnValue({
    query: undefined,
    handleRefresh: mockHandleRefresh,
    characterId: 1,
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  setDefaultState();
});

describe("CharacterDetailsPanel", () => {
  it("shows Spinner on loading", () => {
    mockUseCharacterDetailData.mockReturnValue({
      query: { status: "pending", isPending: true },
      handleRefresh: mockHandleRefresh,
      characterId: 1,
    });

    render(<CharacterDetailsPanel />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows ErrorDisplay on error", () => {
    mockUseCharacterDetailData.mockReturnValue({
      query: { status: "error", isError: true, error: new Error("Not found") },
      handleRefresh: mockHandleRefresh,
      characterId: 1,
    });

    render(<CharacterDetailsPanel />);

    expect(screen.getByText("Error: Not found")).toBeInTheDocument();
  });

  it("renders CharacterDetail on success", () => {
    mockUseCharacterDetailData.mockReturnValue({
      query: { status: "success", isSuccess: true, data: mockCharacterData },
      handleRefresh: mockHandleRefresh,
      characterId: 1,
    });

    render(<CharacterDetailsPanel />);

    expect(screen.getByTestId("character-detail")).toBeInTheDocument();
    expect(screen.getByTestId("character-detail")).toHaveAttribute(
      "data-name",
      "Rick Sanchez",
    );
  });

  it("renders nothing in idle state", () => {
    mockUseCharacterDetailData.mockReturnValue({
      query: {},
      handleRefresh: mockHandleRefresh,
      characterId: 1,
    });

    render(<CharacterDetailsPanel />);

    expect(screen.getByText("Character Details")).toBeInTheDocument();
    expect(screen.queryByTestId("character-detail")).not.toBeInTheDocument();
  });

  it("Refresh button calls handleRefresh", async () => {
    const user = userEvent.setup();

    mockUseCharacterDetailData.mockReturnValue({
      query: { status: "success", isSuccess: true, data: mockCharacterData },
      handleRefresh: mockHandleRefresh,
      characterId: 1,
    });

    render(<CharacterDetailsPanel />);

    await user.click(screen.getByRole("button", { name: "Refresh" }));

    expect(mockHandleRefresh).toHaveBeenCalled();
  });

  it("calls onClose when Close button clicked", async () => {
    const user = userEvent.setup();

    mockUseCharacterDetailData.mockReturnValue({
      query: { status: "success", isSuccess: true, data: mockCharacterData },
      handleRefresh: mockHandleRefresh,
      characterId: 1,
    });

    render(<CharacterDetailsPanel />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
