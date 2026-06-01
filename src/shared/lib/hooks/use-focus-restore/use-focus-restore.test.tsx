import { describe, expect, it, afterEach } from "vitest";
import { act, renderHook, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { useFocusRestore } from "./use-focus-restore";

afterEach(() => {});

function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <button id="test" data-testid="test">
        Test me
      </button>
      {children}
    </>
  );
}

describe("useFocusRestore", () => {
  it("focuses element when enabled", () => {
    const { rerender, result } = renderHook(
      (props) => useFocusRestore(props.enabled),
      { initialProps: { enabled: false }, wrapper: TestWrapper },
    );

    act(() => {
      result.current("test");
    });

    rerender({ enabled: true });

    const target = screen.getByTestId("test");
    expect(target).toHaveFocus();
  });

  it("does not focus element when disabled", () => {
    const { result, rerender } = renderHook(
      (props) => useFocusRestore(props.enabled),
      { initialProps: { enabled: false }, wrapper: TestWrapper },
    );

    act(() => {
      result.current("test");
    });

    rerender({ enabled: false });

    const target = screen.getByTestId("test");
    expect(target).not.toHaveFocus();
  });

  it("does nothing when element does not exist", () => {
    const { rerender, result } = renderHook(
      (props) => useFocusRestore(props.enabled),
      { initialProps: { enabled: true } },
    );

    act(() => {
      result.current("non-existent-id");
    });

    expect(() => {
      rerender({ enabled: true });
    }).not.toThrow();
  });
});
