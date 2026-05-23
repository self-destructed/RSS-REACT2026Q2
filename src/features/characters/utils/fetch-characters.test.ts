import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCharacters } from "./fetch-characters";
import type { Character } from "@shared/api";

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
    );
    expect(result).toEqual(mockCharacters);
  });

  it("throws error on non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    } as unknown as Response);

    await expect(fetchCharacters([1])).rejects.toThrow(
      "Failed to fetch characters: Not Found",
    );
  });

  it("throws error on network failure", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    await expect(fetchCharacters([1])).rejects.toThrow("Network error");
  });

  it("throws generic error on unknown rejection", async () => {
    vi.mocked(fetch).mockRejectedValue("string error");

    await expect(fetchCharacters([1])).rejects.toThrow(
      "Unknown error while fetching characters",
    );
  });
});
