import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFocusRestore } from "./useFocusRestore";

const mockFocus = vi.fn();
const mockSetAttribute = vi.fn();
const mockRemoveAttribute = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  mockFocus.mockClear();
  mockSetAttribute.mockClear();
  mockRemoveAttribute.mockClear();
});

function mockElement(id: string) {
  const element = {
    id,
    focus: mockFocus,
    setAttribute: mockSetAttribute,
    removeAttribute: mockRemoveAttribute,
  };
  vi.spyOn(document, "getElementById").mockReturnValue(
    element as unknown as HTMLElement,
  );
  return element;
}

describe("useFocusRestore", () => {
  it("returns a function", () => {
    const { result } = renderHook(() => useFocusRestore(true));

    expect(result.current).toBeInstanceOf(Function);
  });

  it("focuses the element when isEnabled is true", () => {
    mockElement("test-id");
    const { result } = renderHook(() => useFocusRestore(true));

    result.current("test-id");

    expect(mockSetAttribute).toHaveBeenCalledWith("tabIndex", "-1");
    vi.advanceTimersByTime(1000);
    expect(mockRemoveAttribute).toHaveBeenCalledWith("tabIndex");
  });

  it("does not focus when isEnabled is false", () => {
    const getElementSpy = vi.spyOn(document, "getElementById");
    const { result } = renderHook(() => useFocusRestore(false));

    result.current("test-id");

    expect(getElementSpy).not.toHaveBeenCalled();
  });
});
