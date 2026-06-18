import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTheme } from "./use-theme";

vi.mock("./theme-context", () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}));

describe("useTheme", () => {
  it("throws when used outside ThemeProvider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within ThemeProvider");
  });
});
