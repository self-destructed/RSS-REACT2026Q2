import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  describe("render", () => {
    it("with id", () => {
      render(<Checkbox checked={false} id="1" onChange={vi.fn()} />);

      const input = screen.getByRole("checkbox");

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("id", "1");
    });

    it("unchecked when checked prop is false", () => {
      render(<Checkbox checked={false} id="1" onChange={vi.fn()} />);
      const input = screen.getByRole("checkbox");

      expect(input).not.toBeChecked();
    });

    it("checked when checked prop is true", () => {
      render(<Checkbox checked={true} id="1" onChange={vi.fn()} />);
      const input = screen.getByRole("checkbox");

      expect(input).toBeChecked();
    });
  });

  describe("should", () => {
    it("call onChange on user interaction", async () => {
      const cb = vi.fn();
      render(<Checkbox checked={true} id="1" onChange={cb} />);
      const input = screen.getByRole("checkbox");

      const user = userEvent.setup();
      await user.click(input);

      expect(cb).toHaveBeenCalled();
      expect(cb).toHaveBeenCalledOnce();
    });
  });
});
