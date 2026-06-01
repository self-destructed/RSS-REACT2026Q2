import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { ThemeContext } from "@shared/context";
import { useTheme } from "./use-theme";

describe("useTheme", () => {
  it("returns theme context when used within provider", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeContext.Provider value={{ theme: "light", toggleTheme: vi.fn() }}>
          {children}
        </ThemeContext.Provider>
      ),
    });

    expect(result.current.theme).toBe("light");
    expect(typeof result.current.toggleTheme).toBe("function");
  });

  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within ThemeProvider");
  });
});
