import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useKeydown } from "./use-keydown";

function TestComponent({
  targetKey,
  handler,
  isActive,
}: {
  targetKey: string;
  handler: () => void;
  isActive?: boolean;
}) {
  useKeydown(targetKey, handler, isActive);
  return <div data-testid="test-component">test</div>;
}

afterEach(() => {
  cleanup();
});

describe("useKeydown", () => {
  it("calls handler when specified key is pressed", async () => {
    const handler = vi.fn();
    render(<TestComponent targetKey="Escape" handler={handler} />);

    await userEvent.keyboard("{Escape}");

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does NOT call handler when a different key is pressed", async () => {
    const handler = vi.fn();
    render(<TestComponent targetKey="Escape" handler={handler} />);

    await userEvent.keyboard("{Enter}");

    expect(handler).not.toHaveBeenCalled();
  });

  it("does NOT call handler when isActive=false", async () => {
    const handler = vi.fn();
    render(
      <TestComponent targetKey="Escape" handler={handler} isActive={false} />,
    );

    await userEvent.keyboard("{Escape}");

    expect(handler).not.toHaveBeenCalled();
  });

  it("cleans up event listener on unmount", async () => {
    const handler = vi.fn();
    const { unmount } = render(
      <TestComponent targetKey="Escape" handler={handler} />,
    );

    unmount();

    await userEvent.keyboard("{Escape}");

    expect(handler).not.toHaveBeenCalled();
  });
});
