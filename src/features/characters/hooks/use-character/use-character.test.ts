import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCharacters, useCharacter } from "./use-character";

// Mock useFetch
vi.mock("../../../../shared/hooks/useFetch", () => ({
  default: vi.fn((url) => ({ status: url ? "success" : "idle", data: null })),
}));

describe("useCharacters", () => {
  it("returns correct state structure", () => {
    const { result } = renderHook(() => useCharacters());

    expect(result.current).toHaveProperty("status");
    expect(result.current).toHaveProperty("data");
  });

  it("accepts name filter", () => {
    const { result } = renderHook(() => useCharacters({ name: "rick" }));

    expect(result.current).toBeDefined();
  });

  it("accepts page filter", () => {
    const { result } = renderHook(() => useCharacters({ page: 2 }));

    expect(result.current).toBeDefined();
  });

  it("accepts both name and page filters", () => {
    const { result } = renderHook(() =>
      useCharacters({ name: "rick", page: 2 }),
    );

    expect(result.current).toBeDefined();
  });
});

describe("useCharacter", () => {
  it("returns correct state structure with id", () => {
    const { result } = renderHook(() => useCharacter(1));

    expect(result.current).toHaveProperty("status");
  });

  it("returns idle state when id is null", () => {
    const { result } = renderHook(() => useCharacter(null));

    expect(result.current.status).toBe("idle");
  });

  it("returns success state when id is provided (mock returns success for any url)", () => {
    const { result } = renderHook(() => useCharacter(1));

    expect(result.current.status).toBe("success");
  });
});
