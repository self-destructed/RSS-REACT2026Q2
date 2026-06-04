import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ControlledForm from "./ControlledForm";

describe("ControlledForm", () => {
  describe("render", () => {
    it.each([
      { name: "Name" },
      { name: "Age" },
      { name: "Email" },
      { name: "Gender" },
      { name: "Terms" },
    ])("$name field", ({ name }) => {
      render(<ControlledForm />);

      const field = screen.getByLabelText(new RegExp(name, "i"));

      expect(field).toBeInTheDocument();
    });

    it("submit button", () => {
      render(<ControlledForm />);

      const button = screen.getByRole("button", { name: /submit/i });

      expect(button).toBeInTheDocument();
    });
  });

  describe("should", () => {
    it("call onSubmit with form data when submitted", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<ControlledForm onSubmit={handleSubmit} />);

      await user.type(screen.getByLabelText("Name"), "Rick");
      await user.type(screen.getByLabelText("Age"), "35");
      await user.type(screen.getByLabelText("Email"), "rick@example.com");
      await user.selectOptions(screen.getByLabelText("Gender"), "male");
      await user.click(
        screen.getByLabelText("I agree to the Terms & Conditions"),
      );
      await user.click(screen.getByRole("button", { name: /submit/i }));

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        name: "Rick",
        age: 35,
        email: "rick@example.com",
        gender: "male",
        terms: true,
      });
    });

    it("show validation errors when form is invalid", async () => {
      const user = userEvent.setup();
      render(<ControlledForm />);

      await user.click(screen.getByRole("button", { name: /submit/i }));

      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });
});
