import { describe, expect, it } from "vitest";
import { escapeCsvValue } from "./escape-csv-value";

describe("escapeCsvValue", () => {
  it("wraps value in double quotes", () => {
    expect(escapeCsvValue("hello")).toBe('"hello"');
  });

  it("escapes inner double quotes by doubling them", () => {
    expect(escapeCsvValue('say "hello"')).toBe('"say ""hello"""');
  });

  it("escapes commas", () => {
    expect(escapeCsvValue("a,b")).toBe('"a,b"');
  });

  it("escapes newlines", () => {
    expect(escapeCsvValue("a\nb")).toBe('"a\nb"');
  });

  it("escapes combination of special characters", () => {
    expect(escapeCsvValue('a,"b"\nc')).toBe('"a,""b""\nc"');
  });

  it("handles empty string", () => {
    expect(escapeCsvValue("")).toBe('""');
  });
});
