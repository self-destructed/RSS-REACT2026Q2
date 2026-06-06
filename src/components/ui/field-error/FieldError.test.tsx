import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FieldError from "./FieldError";

describe("FieldError", () => {
  describe("render", () => {
    it("error message when provided", () => {
      render(<FieldError message="Name is required" />);

      const element = screen.getByText("Name is required");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("P");
      expect(element.className).not.toContain("invisible");
    });

    it("renders invisibly when message is empty", () => {
      render(<FieldError message="" />);

      const element = screen.getByText("\u00A0");
      expect(element.tagName).toBe("P");
      expect(element.className).toContain("invisible");
    });

    it("renders invisibly when message is undefined", () => {
      render(<FieldError />);

      const element = screen.getByText("\u00A0");
      expect(element.tagName).toBe("P");
      expect(element.className).toContain("invisible");
    });
  });
});
