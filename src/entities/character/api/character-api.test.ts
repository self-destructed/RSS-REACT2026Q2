import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCharacters } from "./character-api";
import type { Character } from "../model";

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  },
];

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchCharacters", () => {
  it("returns empty array when ids is empty", async () => {
    const result = await fetchCharacters([]);

    expect(result).toEqual([]);
  });

  it("fetches characters by ids", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => mockCharacters,
    } as unknown as Response);

    const result = await fetchCharacters([1, 2]);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/character/1,2,"),
      undefined,
    );
    expect(result).toEqual(mockCharacters);
  });

  it("throws on non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
    } as unknown as Response);

    await expect(fetchCharacters([1])).rejects.toThrow("HTTP 404");
  });

  it("throws on network failure", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    await expect(fetchCharacters([1])).rejects.toThrow("Network error");
  });
});
