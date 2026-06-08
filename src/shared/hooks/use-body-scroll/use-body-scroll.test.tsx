import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { useBodyScroll } from "./use-body-scroll";

function TestComponent({ isLocked }: { isLocked: boolean }) {
  useBodyScroll(isLocked);
  return <div data-testid="test-component">test</div>;
}

const originalOverflow = "";
const originalPaddingRight = "";

beforeEach(() => {
  document.body.style.overflow = originalOverflow;
  document.body.style.paddingRight = originalPaddingRight;
});

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  vi.restoreAllMocks();
});

describe("useBodyScroll", () => {
  it("sets overflow=hidden when isLocked=true", () => {
    render(<TestComponent isLocked={true} />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores original overflow when isLocked=false", () => {
    document.body.style.overflow = "scroll";

    const { rerender } = render(<TestComponent isLocked={true} />);
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<TestComponent isLocked={false} />);
    expect(document.body.style.overflow).toBe("scroll");
  });

  it("restores overflow on unmount", () => {
    document.body.style.overflow = "auto";

    const { unmount } = render(<TestComponent isLocked={true} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("handles paddingRight for scrollbar width compensation", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(815);
    vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(
      800,
    );

    render(<TestComponent isLocked={true} />);

    expect(document.body.style.paddingRight).toBe("15px");

    vi.restoreAllMocks();
  });

  it("does not modify body.style.paddingRight when not locked", () => {
    const initialPadding = document.body.style.paddingRight;
    render(<TestComponent isLocked={false} />);

    expect(document.body.style.paddingRight).toBe(initialPadding);
  });
});
