import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTheme } from "./use-theme";
import { ThemeProvider } from "@shared/context";

describe("useTheme", () => {
  it("returns theme context when used within provider", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    expect(result.current.theme).toBeDefined();
    expect(typeof result.current.toggleTheme).toBe("function");
  });

  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within ThemeProvider");
  });
});
