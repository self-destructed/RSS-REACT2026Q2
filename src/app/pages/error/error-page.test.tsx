import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import ErrorPage from "./error-page";

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <ErrorPage />
    </BrowserRouter>,
  );
};

beforeEach(() => {
  renderWithRouter();
});

afterEach(() => {
  cleanup();
});

describe("ErrorPage", () => {
  it("renders 'not found' heading", () => {
    const heading = screen.getByRole("heading", { name: /not found/i });

    expect(heading).toBeInTheDocument();
  });

  it("renders link to home", () => {
    const link = screen.getByRole("link", { name: /go to home/i });

    expect(link).toBeInTheDocument();
  });

  it("home link has correct href", () => {
    const link = screen.getByRole("link", { name: /go to home/i });

    expect(link).toHaveAttribute("href", "/");
  });
});
