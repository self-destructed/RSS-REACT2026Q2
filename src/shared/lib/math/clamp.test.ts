import { describe, it, expect } from "vitest";
import { clamp } from "./clamp";

describe("clamp", () => {
  it("returns value when within range", () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  it("clamps value below minimum", () => {
    expect(clamp(0, 1, 10)).toBe(1);
  });

  it("clamps value above maximum", () => {
    expect(clamp(15, 1, 10)).toBe(10);
  });

  it("handles value equal to minimum", () => {
    expect(clamp(1, 1, 10)).toBe(1);
  });

  it("handles value equal to maximum", () => {
    expect(clamp(10, 1, 10)).toBe(10);
  });
});
