import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Portal from "./Portal";

describe("Portal", () => {
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
  });

  it("renders children inside modal-root", () => {
    render(
      <Portal>
        <p>Modal content</p>
      </Portal>,
    );

    const modalRoot = document.getElementById("modal-root");
    expect(modalRoot?.innerHTML).toContain("Modal content");
  });

  it("does not render children outside modal-root", () => {
    render(
      <Portal>
        <p>Modal content</p>
      </Portal>,
    );

    const paragraphs = document.body.querySelectorAll(":scope > p");
    expect(paragraphs.length).toBe(0);
  });

  it("renders multiple children", () => {
    render(
      <Portal>
        <>
          <p>First</p>
          <p>Second</p>
        </>
      </Portal>,
    );

    const modalRoot = document.getElementById("modal-root");
    expect(modalRoot?.querySelector("p")).toHaveTextContent("First");
    expect(modalRoot?.querySelectorAll("p").length).toBe(2);
  });

  it("cleans up container on unmount", () => {
    const { unmount } = render(
      <Portal>
        <p>Modal content</p>
      </Portal>,
    );

    const modalRoot = document.getElementById("modal-root");
    expect(modalRoot?.children.length).toBe(1);

    unmount();

    expect(modalRoot?.children.length).toBe(0);
  });
});
