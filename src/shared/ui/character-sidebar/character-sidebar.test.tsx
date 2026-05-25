import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharacterSidebar } from "./character-sidebar";

afterEach(cleanup);

describe("CharacterSidebar", () => {
  it("should render children", () => {
    render(<CharacterSidebar onClose={vi.fn()}>content</CharacterSidebar>);

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("should render default title when not provided", () => {
    render(<CharacterSidebar onClose={vi.fn()}>content</CharacterSidebar>);

    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("should render custom title", () => {
    render(
      <CharacterSidebar onClose={vi.fn()} title="Custom Title">
        content
      </CharacterSidebar>,
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("should call onClose when close button clicked", async () => {
    const onClose = vi.fn();

    render(<CharacterSidebar onClose={onClose}>content</CharacterSidebar>);

    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Close"));

    expect(onClose).toHaveBeenCalled();
  });
});
