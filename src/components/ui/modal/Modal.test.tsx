import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
  cleanup();
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
});

describe("Modal", () => {
  it("renders nothing when open=false", () => {
    render(
      <Modal open={false} onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  it("renders children inside portal when open=true", () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("close button calls onClose", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );

    await user.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("click outside (on overlay) calls onClose", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );

    // Get the overlay — it's the parent of the dialog
    const dialog = screen.getByRole("dialog");
    const overlay = dialog.parentElement;
    expect(overlay).toBeInTheDocument();

    await user.click(overlay!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("click inside (on dialog) does NOT call onClose", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    await user.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });
});
