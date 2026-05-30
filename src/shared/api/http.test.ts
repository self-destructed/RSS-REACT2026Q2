import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { http, HttpError } from "./http";

const fetchSpy = vi.spyOn(globalThis, "fetch");

describe("http", () => {
  afterEach(() => {
    fetchSpy.mockClear();
  });
  afterAll(() => {
    fetchSpy.mockRestore();
  });

  describe("get", () => {
    it("returns data on success", async () => {
      fetchSpy.mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve("success result"),
      } as Response);

      const data = await http.get("url");

      expect(data).toBe("success result");
    });

    it("throws HttpError on non-ok response", async () => {
      fetchSpy.mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(http.get("url")).rejects.toThrow(/404/);
    });

    it("throws on network failure", async () => {
      fetchSpy.mockRejectedValue(new Error("Network error"));

      await expect(http.get("url")).rejects.toThrow(/network error/i);
    });

    it("passes signal to fetch", async () => {
      const controller = new AbortController();
      const { signal } = controller;
      fetchSpy.mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve("success result"),
      } as Response);

      await http.get("url", signal);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("url"),
        expect.objectContaining({ signal }),
      );
    });
  });
});

describe("HttpError", () => {
  it("has status and message", () => {
    const error = new HttpError(404, "Not Found");

    expect(error.status).toBe(404);
    expect(error.message).toBe("Not Found");
    expect(error.name).toBe("HttpError");
  });

  it("defaults message to HTTP {status}", () => {
    const error = new HttpError(500);

    expect(error.status).toBe(500);
    expect(error.message).toBe("HTTP 500");
  });
});
