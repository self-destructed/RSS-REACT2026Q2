import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";

vi.mock("@shared/lib", () => ({
  useTheme: vi.fn(() => ({ theme: "light", toggleTheme: vi.fn() })),
  useFetch: vi.fn(),
  useLocalStorage: vi.fn(),
}));

vi.mock("@shared/ui", () => ({
  Navbar: () => <nav data-testid="navbar" />,
  ThemeToggle: ({
    theme,
    onToggle,
  }: {
    theme: string;
    onToggle: () => void;
  }) => (
    <button type="button" onClick={onToggle} data-testid="theme-toggle">
      {theme}
    </button>
  ),
}));

vi.mock("@shared/context", () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Header", () => {
  it("renders navbar and theme toggle", () => {
    render(<Header />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });
});
