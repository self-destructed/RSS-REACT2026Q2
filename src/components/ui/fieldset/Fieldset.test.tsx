import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Fieldset from "./Fieldset";

describe("Fieldset", () => {
  describe("render", () => {
    it("legend", () => {
      render(
        <Fieldset title="User Info">
          <input />
        </Fieldset>,
      );

      const legend = screen.getByText(/user info/i);

      expect(legend).toBeInTheDocument();
    });

    it("no legend when title is not provided", () => {
      render(
        <Fieldset>
          <input />
        </Fieldset>,
      );

      const legend = screen.queryByRole("legend");

      expect(legend).not.toBeInTheDocument();
    });

    it("children inside fieldset", () => {
      render(
        <Fieldset title="Test">
          <input data-testid="child-input" />
        </Fieldset>,
      );

      const child = screen.getByTestId("child-input");

      expect(child).toBeInTheDocument();
    });

    it("merges className with default classes", () => {
      render(
        <Fieldset title="Test" className="custom-class">
          <input />
        </Fieldset>,
      );

      const fieldset = screen.getByRole("group");

      expect(fieldset).toHaveClass("border", "p-4", "rounded", "custom-class");
    });
  });
});
