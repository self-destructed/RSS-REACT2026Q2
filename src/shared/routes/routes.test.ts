import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";

describe("ROUTES", () => {
  describe("should", () => {
    it("generate character details path", () => {
      expect(ROUTES.CHARACTERS_DETAILS("42")).toBe("/characters/details/42");
    });
  });
});
