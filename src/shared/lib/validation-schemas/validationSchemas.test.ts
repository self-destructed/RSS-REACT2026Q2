import { describe, it, expect } from "vitest";
import { schema } from "./validationSchemas";
import { createValidFormData } from "../create-valid-form-data";

describe("uncontrolledSchema", () => {
  describe("valid form data", () => {
    it("accept valid form data", () => {
      const validFile = new File(["x"], "test.png", { type: "image/png" });
      const validData = createValidFormData({
        image: validFile,
        country: "Russia",
      });
      const result = schema.validateSync(validData);

      expect(result).toEqual(validData);
    });
  });

  describe("name", () => {
    it("reject lowercase start", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ name: "rick" })),
      ).toThrow();
    });
  });

  describe("age", () => {
    it("reject negative", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ age: -1 })),
      ).toThrow();
    });

    it("accept 0", () => {
      const result = schema.validateSync(createValidFormData({ age: 0 }));

      expect(result.age).toBe(0);
    });
  });

  describe("email", () => {
    it("reject without @", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ email: "rickexample.com" })),
      ).toThrow();
    });

    it("reject without domain", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ email: "rick@" })),
      ).toThrow();
    });
  });

  describe("gender", () => {
    it("reject empty", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ gender: "" })),
      ).toThrow();
    });
  });

  describe("terms", () => {
    it("reject not accepted", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ terms: false })),
      ).toThrow();
    });
  });

  describe("image", () => {
    it("accept missing", () => {
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

  describe("country", () => {
    it("reject empty", () => {
      expect(() =>
        schema.validateSync(createValidFormData({ country: "" })),
      ).toThrow("Please select a valid country");
    });

    it("reject invalid country", () => {
      expect(() =>
        schema.validateSync(
          createValidFormData({ country: "NonExistentLand" }),
        ),
      ).toThrow("Please select a valid country");
    });

    it("accept valid country", () => {
      const result = schema.validateSync(
        createValidFormData({ country: "Russia" }),
      );

      expect(result.country).toBe("Russia");
    });
  });
});
