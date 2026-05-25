import { describe, it, expect } from "vitest";
import { buildQueryString } from "./query-string";

describe("buildQueryString", () => {
  it("returns empty string when params is null", () => {
    const result = buildQueryString(null);

    expect(result).toBe("");
  });

  it("returns empty string when params is undefined", () => {
    const result = buildQueryString(undefined);

    expect(result).toBe("");
  });

  it("returns empty string for empty object", () => {
    const result = buildQueryString({});

    expect(result).toBe("");
  });

  it("builds query string with single param", () => {
    const result = buildQueryString({ page: "2" });

    expect(result).toBe("page=2");
  });

  it("builds query string with multiple params", () => {
    const result = buildQueryString({ page: "2", name: "rick" });

    expect(result).toBe("page=2&name=rick");
  });

  it("skips undefined values", () => {
    const result = buildQueryString({ page: "2", name: undefined });

    expect(result).toBe("page=2");
  });

  it("skips null values", () => {
    const result = buildQueryString({ page: "2", name: null });

    expect(result).toBe("page=2");
  });

  it("skips empty string values", () => {
    const result = buildQueryString({ page: "2", name: "" });

    expect(result).toBe("page=2");
  });

  it("converts number to string", () => {
    const result = buildQueryString({ page: 2 });

    expect(result).toBe("page=2");
  });
});
