import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import CharacterDetail from "./character-detail";
import type { Character } from "../../../../shared/api/types";

afterEach(cleanup);

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "https://example.com/rick.jpg",
  episode: ["ep1", "ep2", "ep3"],
  url: "",
  created: "",
};

describe("CharacterDetail", () => {
  describe("render", () => {
    it("should render character name", () => {
      render(<CharacterDetail character={mockCharacter} />);

      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    });

    it("should render character image", () => {
      render(<CharacterDetail character={mockCharacter} />);

      const img = screen.getByRole("img");

      expect(img).toHaveAttribute("src", "https://example.com/rick.jpg");
      expect(img).toHaveAttribute("alt", "Rick Sanchez");
    });

    it("should render species and gender", () => {
      render(<CharacterDetail character={mockCharacter} />);

      expect(screen.getByText(/male/i)).toBeInTheDocument();
    });

    it("should render status", () => {
      render(<CharacterDetail character={mockCharacter} />);

      expect(screen.getByText(/alive/i)).toBeInTheDocument();
    });

    it("should render origin", () => {
      render(<CharacterDetail character={mockCharacter} />);

      expect(screen.getByText(/origin/i)).toBeInTheDocument();
    });

    it("should render location", () => {
      render(<CharacterDetail character={mockCharacter} />);

      expect(screen.getByText(/location/i)).toBeInTheDocument();
    });

    it("should render episode count", () => {
      render(<CharacterDetail character={mockCharacter} />);

      expect(screen.getByText(/3/i)).toBeInTheDocument();
    });
  });
});
