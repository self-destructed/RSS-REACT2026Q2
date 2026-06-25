import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

beforeEach(() => {
  if (typeof localStorage !== "undefined") {
    localStorage.clear();
  }
});

describe("useLocalStorage", () => {
  it("returns initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current[0]).toBe("default");
    expect(localStorage.getItem("test-key")).toBe('"default"');
  });

  it("returns stored value when localStorage has data", () => {
    localStorage.setItem("test-key", '"stored-value"');
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current[0]).toBe("stored-value");
  });

  it("updates stored value", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    act(() => {
      result.current[1]("new-value");
    });

    expect(result.current[0]).toBe("new-value");
    expect(localStorage.getItem("test-key")).toBe('"new-value"');
  });

  it("updates stored value with function updater", () => {
    localStorage.setItem("test-key", "5");
    const { result } = renderHook(() => useLocalStorage<number>("test-key", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(6);
  });

  it("handles JSON parse errors gracefully", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    localStorage.setItem("test-key", "invalid-json");
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current[0]).toBe("default");
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("handles missing localStorage gracefully (SSR / privacy mode)", () => {
    const originalStorage = globalThis.window.localStorage;
    try {
      Object.defineProperty(globalThis.window, "localStorage", {
        value: undefined,
        configurable: true,
      });

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "ssr-default"),
      );
      expect(result.current[0]).toBe("ssr-default");
    } finally {
      Object.defineProperty(globalThis.window, "localStorage", {
        value: originalStorage,
        configurable: true,
      });
    }
  });
});
