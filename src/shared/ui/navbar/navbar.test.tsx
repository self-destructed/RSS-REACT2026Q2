import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Navbar } from "./navbar";

describe("Navbar", () => {
  describe("renders", () => {
    it("all nav links", () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
      );

      const links = screen.getAllByRole("link");

      expect(links).toHaveLength(4);
    });
  });

  describe("should", () => {
    it("indicate active link", () => {
      render(
        <MemoryRouter initialEntries={["/characters"]}>
          <Navbar />
        </MemoryRouter>,
      );
      const charactersLink = screen.getByRole("link", { name: "Characters" });

      expect(charactersLink).toHaveAttribute("aria-current", "page");
    });
  });
});
