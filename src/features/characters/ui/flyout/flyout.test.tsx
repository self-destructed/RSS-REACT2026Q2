import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flyout } from "./flyout";

afterEach(cleanup);

describe("Flyout", () => {
  it("renders selected count", () => {
    render(<Flyout count={3} onUnselectAll={vi.fn()} onDownload={vi.fn()} />);

    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it("renders Unselect all button", () => {
    render(<Flyout count={1} onUnselectAll={vi.fn()} onDownload={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /unselect/i }),
    ).toBeInTheDocument();
  });

  it("renders Download CSV button", () => {
    render(<Flyout count={1} onUnselectAll={vi.fn()} onDownload={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /download/i }),
    ).toBeInTheDocument();
  });

  it("calls onUnselectAll when Unselect all is clicked", async () => {
    const onUnselectAll = vi.fn();

    render(
      <Flyout count={2} onUnselectAll={onUnselectAll} onDownload={vi.fn()} />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /unselect/i }));

    expect(onUnselectAll).toHaveBeenCalledTimes(1);
  });

  it("calls onDownload when Download CSV is clicked", async () => {
    const onDownload = vi.fn();

    render(
      <Flyout count={2} onUnselectAll={vi.fn()} onDownload={onDownload} />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /download/i }));

    expect(onDownload).toHaveBeenCalledTimes(1);
  });
});
