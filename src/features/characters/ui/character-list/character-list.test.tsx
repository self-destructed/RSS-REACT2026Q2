import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import CharacterList from "./character-list";
import type { Character } from "../../../../shared/api/types";

afterEach(cleanup);

const mockCharacters: Character[] = [
  {
    id: 0,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  },
  {
    id: 1,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth", url: "" },
    location: { name: "Earth", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  },
];

describe("CharacterList", () => {
  describe("render", () => {
    it("should render correct number of items", () => {
      render(<CharacterList data={mockCharacters} />);

      const items = screen.getAllByRole("listitem");

      expect(items).toHaveLength(mockCharacters.length);
    });

    it("should pass correct data to CharacterCard", () => {
      render(<CharacterList data={mockCharacters} />);

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });

    it("should render nothing when data is empty", () => {
      render(<CharacterList data={[]} />);

      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });
  });
});
