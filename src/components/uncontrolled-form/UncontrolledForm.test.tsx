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
    it("call onSubmit with form data when submitted", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<UncontrolledForm onSubmit={handleSubmit} />);

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
      render(<UncontrolledForm onSubmit={vi.fn()} />);

      await user.click(screen.getByRole("button", { name: /submit/i }));

      expect(await screen.findByText("Name is required")).toBeInTheDocument();
      expect(await screen.findByText("Age is required")).toBeInTheDocument();
      expect(await screen.findByText("Email is required")).toBeInTheDocument();
      expect(await screen.findByText("Gender is required")).toBeInTheDocument();
      expect(
        await screen.findByText("You must accept the terms"),
      ).toBeInTheDocument();
    });
  });
});
