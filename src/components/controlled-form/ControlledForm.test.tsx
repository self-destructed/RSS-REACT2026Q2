import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ControlledForm from "./ControlledForm";
import { createValidFormData } from "../../lib/createValidFormData";

describe("ControlledForm", () => {
  describe("render", () => {
    it.each([
      { name: "Name" },
      { name: "Age" },
      { name: "Email" },
      { name: "Gender" },
      { name: "I agree to the Terms & Conditions" },
      { name: "Password" },
      { name: "Image" },
      { name: "Confirm Password" },
      { name: "Country" },
    ])("$name field", ({ name }) => {
      render(<ControlledForm />);

      const field = screen.getByLabelText(new RegExp(`^${name}$`, "i"));

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
      await user.type(screen.getByLabelText("Password"), "Test1@abc");
      await user.type(screen.getByLabelText("Confirm Password"), "Test1@abc");
      await user.type(screen.getByLabelText("Country"), "Russia");
      await user.click(screen.getByRole("button", { name: /submit/i }));

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      const expectedData = createValidFormData();
      expect(handleSubmit).toHaveBeenCalledWith(expectedData);
    });

    it("call onSubmit with form data when file is uploaded", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<ControlledForm onSubmit={handleSubmit} />);

      const file = new File(["test"], "image.png", { type: "image/png" });

      await user.type(screen.getByLabelText("Name"), "Rick");
      await user.type(screen.getByLabelText("Age"), "35");
      await user.type(screen.getByLabelText("Email"), "rick@example.com");
      await user.selectOptions(screen.getByLabelText("Gender"), "male");
      await user.click(
        screen.getByLabelText("I agree to the Terms & Conditions"),
      );
      await user.type(screen.getByLabelText("Password"), "Test1@abc");
      await user.type(screen.getByLabelText("Confirm Password"), "Test1@abc");
      await user.type(screen.getByLabelText("Country"), "Russia");
      await user.upload(screen.getByLabelText("Image"), file);
      await user.click(screen.getByRole("button", { name: /submit/i }));

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ image: file }),
      );
    });

    it("show validation errors when form is invalid", async () => {
      const user = userEvent.setup();
      render(<ControlledForm />);

      await user.click(screen.getByRole("button", { name: /submit/i }));

      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });
});
