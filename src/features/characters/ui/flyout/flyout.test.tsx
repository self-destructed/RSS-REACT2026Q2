import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSelectedIds, useUnselectAllCharacters } from "../../model/store";
import { useQueryClient } from "@tanstack/react-query";
import { Flyout } from "./flyout";

vi.mock("../../model/store");
vi.mock("@tanstack/react-query");
vi.mock("@entities/character", () => ({
  charactersByIdQueryOptions: vi.fn(),
  mapCharacterToCSVObject: vi.fn((c: unknown) => c),
  CHARACTER_CSV_COLUMNS: ["name", "status"],
}));
vi.mock("@shared/lib");

afterEach(cleanup);
afterEach(() => {
  vi.clearAllMocks();
});

describe("Flyout", () => {
  beforeEach(() => {
    vi.mocked(useQueryClient).mockReturnValue({
      fetchQuery: vi.fn().mockResolvedValue([]),
    } as never);
    vi.mocked(useUnselectAllCharacters).mockReturnValue(vi.fn());
  });

  it("returns null when no items selected", () => {
    vi.mocked(useSelectedIds).mockReturnValue([]);
    const { container } = render(<Flyout />);
    expect(container.innerHTML).toBe("");
  });

  it("renders selected count when items selected", () => {
    vi.mocked(useSelectedIds).mockReturnValue([1, 2, 3]);
    render(<Flyout />);
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it("renders Unselect all button", () => {
    vi.mocked(useSelectedIds).mockReturnValue([1]);
    render(<Flyout />);
    expect(
      screen.getByRole("button", { name: /unselect/i }),
    ).toBeInTheDocument();
  });

  it("renders Download CSV button", () => {
    vi.mocked(useSelectedIds).mockReturnValue([1]);
    render(<Flyout />);
    expect(
      screen.getByRole("button", { name: /download/i }),
    ).toBeInTheDocument();
  });

  it("calls unselectAll when Unselect all is clicked", async () => {
    vi.mocked(useSelectedIds).mockReturnValue([1, 2]);
    const unselectAll = vi.fn();
    vi.mocked(useUnselectAllCharacters).mockReturnValue(unselectAll);

    render(<Flyout />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /unselect/i }));

    expect(unselectAll).toHaveBeenCalledTimes(1);
  });
});
