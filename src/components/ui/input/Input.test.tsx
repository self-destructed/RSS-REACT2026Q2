import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  describe("render", () => {
    it.each([
      { label: "Name", id: "name" },
      { label: "Age", id: "age" },
      { label: "Email", id: "email" },
    ])("renders $label field", ({ label, id }) => {
      render(<Input label={label} id={id} />);

      const input = screen.getByLabelText(label);

      expect(input).toBeInTheDocument();
    });

    it("passes type prop to input", () => {
      render(<Input label="Age" id="age" type="number" />);

      const input = screen.getByLabelText("Age");

      expect(input).toHaveAttribute("type", "number");
    });

    it("passes additional className", () => {
      render(<Input label="Name" id="name" className="extra-class" />);

      const input = screen.getByLabelText("Name");

      expect(input).toHaveClass("extra-class");
    });
  });
});
