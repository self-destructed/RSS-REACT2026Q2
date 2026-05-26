import { describe, it, expect } from "vitest";
import { buildQueryString, updateSearchParams } from "./url-params";

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

describe("updateSearchParams", () => {
  it("sets a new param", () => {
    const current = new URLSearchParams();

    const result = updateSearchParams(current, { page: "2" });

    expect(result.get("page")).toBe("2");
  });

  it("overwrites existing param", () => {
    const current = new URLSearchParams("page=1&name=rick");

    const result = updateSearchParams(current, { page: "3" });

    expect(result.get("page")).toBe("3");
    expect(result.get("name")).toBe("rick");
  });

  it("deletes param when value is null", () => {
    const current = new URLSearchParams("page=1&name=rick");

    const result = updateSearchParams(current, { name: null });

    expect(result.get("name")).toBeNull();
    expect(result.get("page")).toBe("1");
  });

  it("does not mutate original params", () => {
    const current = new URLSearchParams("page=1");

    updateSearchParams(current, { name: "rick" });

    expect(current.get("name")).toBeNull();
  });

  it("handles empty updates", () => {
    const current = new URLSearchParams("page=1");

    const result = updateSearchParams(current, {});

    expect(result.get("page")).toBe("1");
  });

  it("sets multiple params at once", () => {
    const current = new URLSearchParams();

    const result = updateSearchParams(current, {
      page: "2",
      name: "morty",
    });

    expect(result.get("page")).toBe("2");
    expect(result.get("name")).toBe("morty");
  });
});
