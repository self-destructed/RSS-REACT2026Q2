import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Pagination } from "./pagination";

// Mock next/link to render a plain <a> for testing
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe("Pagination", () => {
  describe("rendering", () => {
    it("renders prev and next links when hrefs are provided", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          prevHref="/characters?page=4"
          nextHref="/characters?page=6"
        />,
      );

      expect(screen.getByRole("link", { name: /prev/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
    });

    it("renders disabled buttons when hrefs are null", () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          prevHref={null}
          nextHref={null}
        />,
      );

      expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
      expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    });

    it("renders counter with correct page info", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          prevHref="/characters?page=4"
          nextHref="/characters?page=6"
        />,
      );

      expect(screen.getByText("5/20")).toBeInTheDocument();
    });

    it("renders counter with 1/1 for single page", () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          prevHref={null}
          nextHref={null}
        />,
      );

      expect(screen.getByText("1/1")).toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("disables prev button on first page", () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={20}
          prevHref={null}
          nextHref="/characters?page=2"
        />,
      );

      expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
    });

    it("disables next button on last page", () => {
      render(
        <Pagination
          currentPage={20}
          totalPages={20}
          prevHref="/characters?page=19"
          nextHref={null}
        />,
      );

      expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    });

    it("disables both buttons when only one page", () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          prevHref={null}
          nextHref={null}
        />,
      );

      expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
      expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    });

    it("renders links (not buttons) in the middle of pages", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          prevHref="/characters?page=4"
          nextHref="/characters?page=6"
        />,
      );

      expect(screen.getByRole("link", { name: /prev/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
    });
  });

  describe("href correctness", () => {
    it("sets correct href for prev link", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          prevHref="/characters?page=4"
          nextHref="/characters?page=6"
        />,
      );

      const prevLink = screen.getByRole("link", { name: /prev/i });
      expect(prevLink).toHaveAttribute("href", "/characters?page=4");
    });

    it("sets correct href for next link", () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          prevHref="/characters?page=4"
          nextHref="/characters?page=6"
        />,
      );

      const nextLink = screen.getByRole("link", { name: /next/i });
      expect(nextLink).toHaveAttribute("href", "/characters?page=6");
    });
  });
});
