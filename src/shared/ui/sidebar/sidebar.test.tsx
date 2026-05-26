import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./sidebar";

afterEach(cleanup);

describe("Sidebar", () => {
  it("should render children", () => {
    render(<Sidebar onClose={vi.fn()}>content</Sidebar>);

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("should render default title when not provided", () => {
    render(<Sidebar onClose={vi.fn()}>content</Sidebar>);

    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("should render custom title", () => {
    render(
      <Sidebar onClose={vi.fn()} title="Custom Title">
        content
      </Sidebar>,
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("should call onClose when close button clicked", async () => {
    const onClose = vi.fn();

    render(<Sidebar onClose={onClose}>content</Sidebar>);

    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Close"));

    expect(onClose).toHaveBeenCalled();
  });
});
