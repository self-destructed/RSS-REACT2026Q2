import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";

vi.mock("@shared/ui/navbar", () => ({
  Navbar: () => <nav data-testid="navbar" />,
}));

vi.mock("@shared/ui/error", () => ({
  ErrorTrigger: () => (
    <button type="button" data-testid="error-trigger">
      💣 Trigger Error
    </button>
  ),
}));

vi.mock("@shared/ui/theme-toggle", () => ({
  ThemeToggle: () => <button type="button" data-testid="theme-toggle" />,
}));

vi.mock("@shared/context/theme", () => ({
  useTheme: () => ({ theme: "light", toggleTheme: vi.fn() }),
}));

describe("Header", () => {
  it("renders navbar, theme toggle, and error trigger", () => {
    render(<Header />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("error-trigger")).toBeInTheDocument();
  });
});
