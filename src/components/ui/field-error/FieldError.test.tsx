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
    });

    it("renders no paragraph when message is empty", () => {
      const { container } = render(<FieldError message="" />);

      const p = container.querySelector("p");
      expect(p).not.toBeInTheDocument();
    });

    it("renders no paragraph when message is undefined", () => {
      const { container } = render(<FieldError />);

      const p = container.querySelector("p");
      expect(p).not.toBeInTheDocument();
    });
  });
});
