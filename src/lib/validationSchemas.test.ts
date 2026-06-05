import { describe, it, expect } from "vitest";
import { schema } from "./validationSchemas";
import { createValidFormData } from "./createValidFormData";

describe("uncontrolledSchema", () => {
  describe("should", () => {
    it("accept valid form data", () => {
      const validFile = new File(["x"], "test.png", { type: "image/png" });
      const validData = createValidFormData({ image: validFile });
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

    it("accept missing image", () => {
      const result = schema.validateSync(
        createValidFormData({ image: undefined }),
      );

      expect(result.image).toBeUndefined();
    });

    it("reject non-image file", () => {
      const txtFile = new File(["text"], "test.txt", { type: "text/plain" });

      expect(() =>
        schema.validateSync(createValidFormData({ image: txtFile })),
      ).toThrow("Only PNG and JPEG files are allowed");
    });

    it("reject oversized file", () => {
      const largeFile = new File(["x".repeat(3 * 1024 * 1024)], "test.png", {
        type: "image/png",
      });
      expect(() =>
        schema.validateSync(createValidFormData({ image: largeFile })),
      ).toThrow("File must be less than 2MB");
    });

    it("accept valid image", () => {
      const validFile = new File(["x"], "test.png", { type: "image/png" });
      const result = schema.validateSync(
        createValidFormData({ image: validFile }),
      );

      expect(result.image).toBeInstanceOf(File);
    });
  });
});
