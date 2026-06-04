import { describe, it, expect } from "vitest";
import { schema } from "./validationSchemas";
import type { FormValues } from "./validationSchemas";

describe("uncontrolledSchema", () => {
  describe("should", () => {
    it("accept valid form data", () => {
      const validData: FormValues = {
        name: "Rick",
        age: 35,
        email: "rick@example.com",
        gender: "male",
        terms: true,
      };

      const result = schema.validateSync(validData);

      expect(result).toEqual(validData);
    });

    it("reject name starting with lowercase", () => {
      expect(() =>
        schema.validateSync({
          name: "rick",
          age: 35,
          email: "rick@example.com",
          gender: "male",
          terms: true,
        }),
      ).toThrow();
    });

    it("reject negative age", () => {
      expect(() =>
        schema.validateSync({
          name: "Rick",
          age: -1,
          email: "rick@example.com",
          gender: "male",
          terms: true,
        }),
      ).toThrow();
    });

    it("reject email without @", () => {
      expect(() =>
        schema.validateSync({
          name: "Rick",
          age: 35,
          email: "rickexample.com",
          gender: "male",
          terms: true,
        }),
      ).toThrow();
    });

    it("reject email without domain", () => {
      expect(() =>
        schema.validateSync({
          name: "Rick",
          age: 35,
          email: "rick@",
          gender: "male",
          terms: true,
        }),
      ).toThrow();
    });

    it("reject empty gender", () => {
      expect(() =>
        schema.validateSync({
          name: "Rick",
          age: 35,
          email: "rick@example.com",
          gender: "",
          terms: true,
        }),
      ).toThrow();
    });

    it("reject unaccepted terms", () => {
      expect(() =>
        schema.validateSync({
          name: "Rick",
          age: 35,
          email: "rick@example.com",
          gender: "male",
          terms: false,
        }),
      ).toThrow();
    });

    it("accept age 0", () => {
      const result = schema.validateSync({
        name: "Rick",
        age: 0,
        email: "rick@example.com",
        gender: "male",
        terms: true,
      });

      expect(result.age).toBe(0);
    });
  });
});
