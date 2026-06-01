import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flyout } from "./flyout";

afterEach(() => {
  vi.clearAllMocks();
});

describe("Flyout", () => {
  let onUnselectAll: () => void;
  let onDownload: () => void;

  beforeEach(() => {
    onUnselectAll = vi.fn() as () => void;
    onDownload = vi.fn() as () => void;
  });

  it("returns null when count is 0", () => {
    const { container } = render(
      <Flyout
        count={0}
        onUnselectAll={onUnselectAll}
        onDownload={onDownload}
      />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders selected count when items selected", () => {
    render(
      <Flyout
        count={3}
        onUnselectAll={onUnselectAll}
        onDownload={onDownload}
      />,
    );
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it("renders Unselect all button", () => {
    render(
      <Flyout
        count={1}
        onUnselectAll={onUnselectAll}
        onDownload={onDownload}
      />,
    );
    expect(
      screen.getByRole("button", { name: /unselect/i }),
    ).toBeInTheDocument();
  });

  it("renders Download CSV button", () => {
    render(
      <Flyout
        count={1}
        onUnselectAll={onUnselectAll}
        onDownload={onDownload}
      />,
    );
    expect(
      screen.getByRole("button", { name: /download/i }),
    ).toBeInTheDocument();
  });

  it("calls onUnselectAll when Unselect all is clicked", async () => {
    render(
      <Flyout
        count={2}
        onUnselectAll={onUnselectAll}
        onDownload={onDownload}
      />,
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /unselect/i }));

    expect(onUnselectAll).toHaveBeenCalledTimes(1);
  });

  it("calls onDownload when Download CSV is clicked", async () => {
    render(
      <Flyout
        count={2}
        onUnselectAll={onUnselectAll}
        onDownload={onDownload}
      />,
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /download/i }));

    expect(onDownload).toHaveBeenCalledTimes(1);
  });
});
