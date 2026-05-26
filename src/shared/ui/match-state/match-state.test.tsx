import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MatchState } from "./match-state";
import type { LoadingState } from "@shared/lib";

describe("MatchState", () => {
  it("renders loading when status is loading", () => {
    const state: LoadingState<string> = { status: "loading" };

    render(
      <MatchState<string>
        state={state}
        loading={<div data-testid="loader">Loading</div>}
        error={(e) => <span>{e.message}</span>}
      >
        {(data) => <div>{data}</div>}
      </MatchState>,
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders loading as null when loading prop is omitted", () => {
    const state: LoadingState<string> = { status: "loading" };
    const { container } = render(
      <MatchState<string> state={state} error={(e) => <span>{e.message}</span>}>
        {(data) => <div>{data}</div>}
      </MatchState>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("renders error when status is error", () => {
    const state: LoadingState<string> = {
      status: "error",
      error: new Error("Something went wrong"),
    };

    render(
      <MatchState<string>
        state={state}
        loading={<div data-testid="loader">Loading</div>}
        error={(e) => <span data-testid="error-msg">{e.message}</span>}
      >
        {(data) => <div>{data}</div>}
      </MatchState>,
    );

    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders error as null when error prop is omitted", () => {
    const state: LoadingState<string> = {
      status: "error",
      error: new Error("fail"),
    };
    const { container } = render(
      <MatchState<string> state={state} loading={<div>loading</div>}>
        {(data) => <div>{data}</div>}
      </MatchState>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("renders children when status is success", () => {
    const state: LoadingState<string> = { status: "success", data: "Hello" };

    render(
      <MatchState<string>
        state={state}
        loading={<div>Loading</div>}
        error={(e) => <span>{e.message}</span>}
      >
        {(data) => <div data-testid="content">{data}</div>}
      </MatchState>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders nothing when status is idle", () => {
    const state: LoadingState<string> = { status: "idle" };
    const { container } = render(
      <MatchState<string>
        state={state}
        loading={<div>Loading</div>}
        error={(e) => <span>{e.message}</span>}
      >
        {(data) => <div>{data}</div>}
      </MatchState>,
    );

    expect(container.innerHTML).toBe("");
  });
});
