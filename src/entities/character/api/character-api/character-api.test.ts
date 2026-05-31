import { describe, expect, it } from "vitest";
import { API_BASE_URL } from "@shared/api";
import { CHARACTER_API } from "./character-api";

describe("CHARACTER_API", () => {
  it("list returns full character list URL", () => {
    expect(CHARACTER_API.list).toBe(`${API_BASE_URL}/character`);
  });

  it("byId returns URL ending with character id for given id", () => {
    expect(CHARACTER_API.byId(1)).toContain("/character/1");
  });

  it("byId handles multiple different id values", () => {
    expect(CHARACTER_API.byId(42)).toContain("/character/42");
    expect(CHARACTER_API.byId(999)).toContain("/character/999");
  });

  it("byId returns string type", () => {
    expect(typeof CHARACTER_API.byId(1)).toBe("string");
  });
});
