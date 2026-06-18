import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Character } from "../../model";
import { CharacterList } from "./character-list";

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
      render(
        <CharacterList
          data={mockCharacters}
          selectedIds={[]}
          onToggleSelection={vi.fn()}
        />,
      );

      const items = screen.getAllByRole("listitem");

      expect(items).toHaveLength(mockCharacters.length);
    });

    it("should pass correct data to CharacterCard", () => {
      render(
        <CharacterList
          data={mockCharacters}
          selectedIds={[]}
          onToggleSelection={vi.fn()}
        />,
      );

      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });

    it("should render nothing when data is empty", () => {
      render(
        <CharacterList
          data={[]}
          selectedIds={[]}
          onToggleSelection={vi.fn()}
        />,
      );

      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });
  });

  describe("onViewDetails", () => {
    it("calls onViewDetails with character id on details button click", async () => {
      const onViewDetailsMock = vi.fn();
      const user = userEvent.setup();
      render(
        <CharacterList
          data={mockCharacters}
          selectedIds={[]}
          onToggleSelection={vi.fn()}
          onViewDetails={onViewDetailsMock}
        />,
      );

      const buttons = screen.getAllByRole("button", { name: /details/i });
      await user.click(buttons[0]);

      expect(onViewDetailsMock).toHaveBeenCalledWith(0);
    });

    it("does not call onViewDetails when clicking checkbox", async () => {
      const onViewDetailsMock = vi.fn();
      const user = userEvent.setup();
      render(
        <CharacterList
          data={mockCharacters}
          selectedIds={[]}
          onToggleSelection={vi.fn()}
          onViewDetails={onViewDetailsMock}
        />,
      );

      const checkbox = screen.getAllByRole("checkbox")[0];
      await user.click(checkbox);

      expect(onViewDetailsMock).not.toHaveBeenCalled();
    });

    it("does not throw when onViewDetails is not provided", async () => {
      const user = userEvent.setup();
      render(
        <CharacterList
          data={mockCharacters}
          selectedIds={[]}
          onToggleSelection={vi.fn()}
        />,
      );

      const buttons = screen.getAllByRole("button", { name: /details/i });

      await expect(user.click(buttons[0])).resolves.not.toThrow();
    });
  });
});
