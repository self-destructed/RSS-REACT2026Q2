import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UncontrolledForm from "./UncontrolledForm";

describe("UncontrolledForm", () => {
  describe("render", () => {
    it.each([
      { name: "Name" },
      { name: "Age" },
      { name: "Email" },
      { name: "Gender" },
      { name: "Terms" },
    ])("$name field", ({ name }) => {
      render(<UncontrolledForm />);

      const field = screen.getByLabelText(new RegExp(name, "i"));

      expect(field).toBeInTheDocument();
    });

    it("submit button", () => {
      render(<UncontrolledForm />);

      const submitButton = screen.getByRole("button", { name: /submit/i });

      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("should", () => {
    it("call onSubmit when form is submitted", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<UncontrolledForm onSubmit={handleSubmit} />);

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
