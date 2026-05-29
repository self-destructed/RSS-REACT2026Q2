import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryMatch } from "./query-match";
import type { UseQueryResult } from "@tanstack/react-query";

describe("QueryMatch", () => {
  it("renders loading when status is pending", () => {
    const query = {
      status: "pending",
      data: undefined,
      error: null,
    } as UseQueryResult<string>;

    render(
      <QueryMatch<string>
        query={query}
        loading={<div data-testid="loader">Loading</div>}
        error={(e) => <span>{e.message}</span>}
      >
        {(data) => <div>{data}</div>}
      </QueryMatch>,
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders nothing when loading prop is omitted", () => {
    const query = {
      status: "pending",
      data: undefined,
      error: null,
    } as UseQueryResult<string>;
    const { container } = render(
      <QueryMatch<string> query={query} error={(e) => <span>{e.message}</span>}>
        {(data) => <div>{data}</div>}
      </QueryMatch>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("renders error message", () => {
    const query = {
      status: "error",
      data: undefined,
      error: new Error("fail"),
    } as UseQueryResult<string>;

    render(
      <QueryMatch<string>
        query={query}
        loading={<div>Loading</div>}
        error={(e) => <span data-testid="error-msg">{e.message}</span>}
      >
        {(data) => <div>{data}</div>}
      </QueryMatch>,
    );

    expect(screen.getByText("fail")).toBeInTheDocument();
  });

  it("renders nothing when error prop is omitted", () => {
    const query = {
      status: "error",
      data: undefined,
      error: new Error("fail"),
    } as UseQueryResult<string>;
    const { container } = render(
      <QueryMatch<string> query={query} loading={<div>Loading</div>}>
        {(data) => <div>{data}</div>}
      </QueryMatch>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("renders children on success", () => {
    const query = {
      status: "success",
      data: "Hello",
      error: null,
    } as UseQueryResult<string>;

    render(
      <QueryMatch<string>
        query={query}
        loading={<div>Loading</div>}
        error={(e) => <span>{e.message}</span>}
      >
        {(data) => <div data-testid="content">{data}</div>}
      </QueryMatch>,
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
