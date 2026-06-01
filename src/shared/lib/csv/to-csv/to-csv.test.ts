import { describe, expect, it } from "vitest";
import { toCSV } from "./to-csv";

describe("toCSV", () => {
  it("generates header and rows", () => {
    const data = [
      { id: 1, name: "Rick" },
      { id: 2, name: "Morty" },
    ];
    const result = toCSV(data, ["id", "name"]);

    expect(result).toBe("id,name\n1,Rick\n2,Morty");
  });

  it("escapes values with commas", () => {
    const data = [{ name: "Diane, Beth" }];
    const result = toCSV(data, ["name"]);

    expect(result).toBe('name\n"Diane, Beth"');
  });

  it("escapes values with quotes", () => {
    const data = [{ name: 'say "hello"' }];
    const result = toCSV(data, ["name"]);

    expect(result).toBe('name\n"say ""hello"""');
  });

  it("escapes values with newlines", () => {
    const data = [{ name: "a\nb" }];
    const result = toCSV(data, ["name"]);

    expect(result).toBe('name\n"a\nb"');
  });

  it("handles empty data", () => {
    const result = toCSV([], ["id", "name"]);

    expect(result).toBe("id,name");
  });

  it("converts null and undefined to empty string", () => {
    const data = [{ id: 1, name: null, status: undefined }];
    const columns = ["id", "name", "status"] as const;

    const result = toCSV(data, columns);

    expect(result).toBe("id,name,status\n1,,");
  });

  it("handles single row", () => {
    const data = [{ id: 1, name: "Rick" }];
    const result = toCSV(data, ["id", "name"]);

    expect(result).toBe("id,name\n1,Rick");
  });
});
