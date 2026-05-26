import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MatchState } from "./match-state";

type TestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

describe("MatchState", () => {
  it("renders loading when status is loading", () => {
    const state: TestState = { status: "loading" };

    render(
      <MatchState
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
    const state: TestState = { status: "loading" };
    const { container } = render(
      <MatchState state={state} error={(e) => <span>{e.message}</span>}>
        {(data) => <div>{data}</div>}
      </MatchState>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("renders error when status is error", () => {
    const state: TestState = {
      status: "error",
      error: new Error("Something went wrong"),
    };

    render(
      <MatchState
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
    const state: TestState = { status: "error", error: new Error("fail") };
    const { container } = render(
      <MatchState state={state} loading={<div>loading</div>}>
        {(data) => <div>{data}</div>}
      </MatchState>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("renders children when status is success", () => {
    const state: TestState = { status: "success", data: "Hello" };

    render(
      <MatchState
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
    const state: TestState = { status: "idle" };
    const { container } = render(
      <MatchState
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
