import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";

vi.mock("@shared/lib", () => ({
  useLocalStorage: vi.fn(),
}));

import { useLocalStorage } from "@shared/lib";
import { ThemeContext } from "./theme-context";
import { ThemeProvider } from "./theme-provider";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-theme");
});

function TestConsumer() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;
  return (
    <div>
      <span data-testid="theme">{ctx.theme}</span>
      <button onClick={ctx.toggleTheme}>Toggle</button>
    </div>
  );
}

function mockUseLocalStorage(theme: "light" | "dark") {
  const setTheme = vi.fn();
  vi.mocked(useLocalStorage).mockReturnValue([theme, setTheme]);
  return setTheme;
}

describe("ThemeProvider", () => {
  describe("initial theme", () => {
    it("renders with given theme from useLocalStorage", () => {
      mockUseLocalStorage("light");

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      );

      expect(screen.getByTestId("theme")).toHaveTextContent("light");
    });

    it("accepts dark theme from useLocalStorage", () => {
      mockUseLocalStorage("dark");

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      );

      expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    });
  });

  describe("toggleTheme", () => {
    it("calls setTheme with toggled value", async () => {
      const setTheme = mockUseLocalStorage("light");

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      );
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: /toggle/i }));

      expect(setTheme).toHaveBeenCalled();
    });
  });

  describe("data-theme attribute", () => {
    it("sets data-theme on documentElement", () => {
      mockUseLocalStorage("light");

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      );

      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });

    it("sets data-theme to dark when theme is dark", () => {
      mockUseLocalStorage("dark");

      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      );

      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });
  });
});
