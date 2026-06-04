import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Select from "./Select";

const genderOptions = [
  { value: "", label: "Select gender", disabled: true },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

describe("Select", () => {
  describe("render", () => {
    it("renders with label", () => {
      render(<Select label="Gender" id="gender" options={genderOptions} />);

      const select = screen.getByLabelText("Gender");

      expect(select).toBeInTheDocument();
      expect(select).toBeInstanceOf(HTMLSelectElement);
    });

    it("renders all options", () => {
      render(<Select label="Gender" id="gender" options={genderOptions} />);

      const options = screen.getAllByRole("option");

      expect(options).toHaveLength(4);
    });

    it("passes className to select", () => {
      render(
        <Select
          label="Gender"
          id="gender"
          options={genderOptions}
          className="extra-class"
        />,
      );

      const select = screen.getByLabelText("Gender");

      expect(select).toHaveClass("extra-class");
    });
  });
});
