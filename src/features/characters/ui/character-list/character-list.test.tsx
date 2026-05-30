import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it("renders items with button role for accessibility", () => {
      render(<CharacterList data={mockCharacters} />);

      const items = screen.getAllByRole("button");
      expect(items).toHaveLength(2);
    });
  });

  describe("onSelect", () => {
    it("calls onSelect with character id on click", async () => {
      const onSelectMock = vi.fn();
      const user = userEvent.setup();
      render(<CharacterList data={mockCharacters} onSelect={onSelectMock} />);

      const firstItem = screen.getAllByRole("button")[0];
      await user.click(firstItem);

      expect(onSelectMock).toHaveBeenCalledWith(0);
    });

    it("calls onSelect on Enter key press", async () => {
      const onSelectMock = vi.fn();
      const user = userEvent.setup();
      render(<CharacterList data={mockCharacters} onSelect={onSelectMock} />);

      const firstItem = screen.getAllByRole("button")[0];
      firstItem.focus();
      await user.keyboard("{Enter}");

      expect(onSelectMock).toHaveBeenCalledWith(0);
    });

    it("calls onSelect on Space key press", async () => {
      const onSelectMock = vi.fn();
      const user = userEvent.setup();
      render(<CharacterList data={mockCharacters} onSelect={onSelectMock} />);

      const firstItem = screen.getAllByRole("button")[0];
      firstItem.focus();
      await user.keyboard(" ");

      expect(onSelectMock).toHaveBeenCalledWith(0);
    });

    it("does not call onSelect on other key press", async () => {
      const onSelectMock = vi.fn();
      const user = userEvent.setup();
      render(<CharacterList data={mockCharacters} onSelect={onSelectMock} />);

      await user.tab();
      await user.keyboard("a");

      expect(onSelectMock).not.toHaveBeenCalled();
    });

    it("does not throw when onSelect is not provided", async () => {
      const user = userEvent.setup();
      render(<CharacterList data={mockCharacters} />);

      const firstItem = screen.getAllByRole("button")[0];

      await expect(user.click(firstItem)).resolves.not.toThrow();
    });
  });
});
