import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { useFocusTrap } from "./use-focus-trap";

function TestComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef);

  return (
    <div ref={containerRef} data-testid="container">
      <button type="button" data-testid="first-btn">
        First
      </button>
      <button type="button" data-testid="second-btn">
        Second
      </button>
      <button type="button" data-testid="third-btn">
        Third
      </button>
    </div>
  );
}

function EmptyContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef);

  return (
    <div ref={containerRef} data-testid="empty-container">
      <p>No focusable elements here</p>
    </div>
  );
}

afterEach(() => {
  cleanup();
});

describe("useFocusTrap", () => {
  const user = userEvent.setup();

  it("cycles from last to first element on Tab", async () => {
    render(<TestComponent />);

    const firstBtn = screen.getByTestId("first-btn");
    const thirdBtn = screen.getByTestId("third-btn");

    // Start with focus on last button
    thirdBtn.focus();
    expect(document.activeElement).toBe(thirdBtn);

    // Tab forward — should cycle to first
    await user.keyboard("{Tab}");
    expect(document.activeElement).toBe(firstBtn);
  });

  it("cycles from first to last on Shift+Tab", async () => {
    render(<TestComponent />);

    const firstBtn = screen.getByTestId("first-btn");
    const thirdBtn = screen.getByTestId("third-btn");

    // Start with focus on first button
    firstBtn.focus();
    expect(document.activeElement).toBe(firstBtn);

    // Shift+Tab — should cycle to last
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(document.activeElement).toBe(thirdBtn);
  });

  it("does nothing if no focusable elements in container", async () => {
    render(<EmptyContainer />);

    // Focus the container itself (p element is not focusable)
    const container = screen.getByTestId("empty-container");
    container.focus();

    // Dispatched tab event — should not cause errors
    await expect(user.keyboard("{Tab}")).resolves.not.toThrow();
  });

  it("does not cycle when pressing Tab with active element not first or last", async () => {
    render(<TestComponent />);

    const secondBtn = screen.getByTestId("second-btn");
    const thirdBtn = screen.getByTestId("third-btn");

    // Focus the middle button
    secondBtn.focus();
    expect(document.activeElement).toBe(secondBtn);

    // Tab forward — middle is not last, handler does nothing special
    // Tab naturally moves focus to the next element
    await user.keyboard("{Tab}");
    expect(document.activeElement).toBe(thirdBtn);
  });

  it("cleans up event listener on unmount", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    removeSpy.mockRestore();
  });
});
