import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  describe("render", () => {
    it("with label", () => {
      render(<Checkbox label="I agree" id="terms" />);

      const checkbox = screen.getByLabelText("I agree");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    it("passes className", () => {
      render(<Checkbox label="I agree" id="terms" className="extra-class" />);

      const checkbox = screen.getByLabelText("I agree");

      expect(checkbox).toHaveClass("extra-class");
    });

    it("shows error message when error prop is provided", () => {
      render(
        <Checkbox
          label="I agree"
          id="terms"
          error="You must accept the terms"
        />,
      );

      expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
    });
  });
});
