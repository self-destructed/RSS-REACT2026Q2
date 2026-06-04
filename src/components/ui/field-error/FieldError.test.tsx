import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FieldError from "./FieldError";

describe("FieldError", () => {
  describe("render", () => {
    it("error message when provided", () => {
      render(<FieldError message="Name is required" />);

      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    it("nothing when message is empty", () => {
      const { container } = render(<FieldError message="" />);

      expect(container.querySelector("p")).toBeNull();
    });

    it("nothing when message is undefined", () => {
      const { container } = render(<FieldError />);

      expect(container.querySelector("p")).toBeNull();
    });
  });
});
