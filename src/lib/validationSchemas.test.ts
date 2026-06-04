import { describe, it, expect } from "vitest";
import { schema } from "./validationSchemas";
import { createValidFormData } from "./createValidFormData";

describe("uncontrolledSchema", () => {
  describe("should", () => {
    it("accept valid form data", () => {
      const validData = createValidFormData();
      const result = schema.validateSync(validData);

      expect(result).toEqual(validData);
    });

    it("reject name starting with lowercase", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ name: "rick" })),
      ).toThrow();
    });

    it("reject negative age", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ age: -1 })),
      ).toThrow();
    });

    it("reject email without @", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ email: "rickexample.com" })),
      ).toThrow();
    });

    it("reject email without domain", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ email: "rick@" })),
      ).toThrow();
    });

    it("reject empty gender", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ gender: "" })),
      ).toThrow();
    });

    it("reject unaccepted terms", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ terms: false })),
      ).toThrow();
    });

    it("accept age 0", () => {
      const result = schema.validateSync(createValidFormData({ age: 0 }));

      expect(result.age).toBe(0);
    });
  });
});
