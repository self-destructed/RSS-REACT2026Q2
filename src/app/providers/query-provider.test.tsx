import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryProvider } from "./query-provider";

vi.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: () => null,
}));

afterEach(() => {
  cleanup();
});

describe("QueryProvider", () => {
  it("renders children", () => {
    render(
      <QueryProvider>
        <span data-testid="child">Hello</span>
      </QueryProvider>,
    );

    expect(screen.getByTestId("child")).toHaveTextContent("Hello");
  });
});
