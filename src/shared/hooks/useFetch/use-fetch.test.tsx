import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "./use-fetch";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useFetch", () => {
  it("returns idle when url is null", () => {
    const { result } = renderHook(() => useFetch(null));

    expect(result.current).toEqual({ status: "idle" });
  });

  it("fetches data successfully", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => ({ name: "Rick" }),
    } as unknown as Response);
    const { result } = renderHook(() => useFetch("/api/character/1"));

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    if (result.current.status === "success") {
      expect(result.current.data).toEqual({ name: "Rick" });
    }
  });

  it("handles error on non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);
    const { result } = renderHook(() => useFetch("/api/character/999"));

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    if (result.current.status === "error") {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toMatch(/404/);
    }
  });

  it("loading state is set correctly", async () => {
    let resolveFetch!: (value: Response) => void;
    const fetchPromise = new Promise<Response>((resolve) => {
      resolveFetch = resolve;
    });
    vi.mocked(fetch).mockReturnValue(fetchPromise);
    const { result } = renderHook(() => useFetch("/api/character/1"));

    expect(result.current.status).toBe("loading");

    resolveFetch({
      ok: true,
      json: () => ({ name: "Rick" }),
    } as unknown as Response);

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });
  });

  it("does not throw on unmount", () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));

    const { unmount } = renderHook(() => useFetch("/api/character/1"));

    expect(() => {
      unmount();
    }).not.toThrow();
  });
  it("handles fetch errors", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useFetch("/api/character/1"));

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    if (result.current.status === "error") {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toBe("Network error");
    }
  });
});
