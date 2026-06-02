import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../app/App";

describe("App", () => {
  it("renders Forms App text", () => {
    render(<App />);
    expect(screen.getByText("Forms App")).toBeInTheDocument();
  });
});
