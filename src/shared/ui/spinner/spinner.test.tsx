import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Spinner from "./spinner";

afterEach(cleanup);

describe("Spinner", () => {
  beforeEach(() => {
    render(<Spinner />);
  });

  it("renders without crashing", () => {
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has accessible loading text", () => {
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("has sr-only class on loading text", () => {
    const loadingText = screen.getByText("Loading…");
    expect(loadingText).toHaveClass("sr-only");
  });

  it("renders svg with spin animation", () => {
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass(/animate-/);
  });
});
