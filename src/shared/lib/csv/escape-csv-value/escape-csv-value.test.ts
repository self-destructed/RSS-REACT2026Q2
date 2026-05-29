import { describe, expect, it } from "vitest";
import { escapeCSVValue } from "./escape-csv-value";

describe("escapeCSVValue", () => {
  it("wraps value in double quotes", () => {
    expect(escapeCSVValue("hello")).toBe('"hello"');
  });

  it("escapes inner double quotes by doubling them", () => {
    expect(escapeCSVValue('say "hello"')).toBe('"say ""hello"""');
  });

  it("escapes commas", () => {
    expect(escapeCSVValue("a,b")).toBe('"a,b"');
  });

  it("escapes newlines", () => {
    expect(escapeCSVValue("a\nb")).toBe('"a\nb"');
  });

  it("escapes combination of special characters", () => {
    expect(escapeCSVValue('a,"b"\nc')).toBe('"a,""b""\nc"');
  });

  it("handles empty string", () => {
    expect(escapeCSVValue("")).toBe('""');
  });
});
