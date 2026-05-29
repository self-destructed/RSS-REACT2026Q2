import { describe, it, expect } from "vitest";
import type { Character } from "../../model";
import { mapCharacterToCSVObject } from "./map-to-csv-rows";

describe("mapCharacterToCSVObject", () => {
  it("maps a full character to CSV object", () => {
    const character = {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth (C-137)", url: "https://..." },
      location: { name: "Citadel of Ricks", url: "https://..." },
      image: "https://...",
      url: "https://...",
      episode: ["https://...", "https://..."],
      created: "2017-11-04T18:48:46.250Z",
    } as Character;

    const result = mapCharacterToCSVObject(character);

    expect(result).toEqual({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      gender: "Male",
      origin: "Earth (C-137)",
      location: "Citadel of Ricks",
    });
  });

  it("handles empty strings", () => {
    const character = {
      id: 2,
      name: "Test Character",
      status: "Dead",
      species: "Alien",
      type: "",
      gender: "Male",
      origin: { name: "", url: "" },
      location: { name: "", url: "" },
      image: "",
      url: "",
      episode: [],
      created: "",
    } as Character;

    const result = mapCharacterToCSVObject(character);

    expect(result).toEqual({
      id: 2,
      name: "Test Character",
      status: "Dead",
      species: "Alien",
      gender: "Male",
      origin: "",
      location: "",
    });
  });

  it("handles unknown values", () => {
    const character = {
      id: 3,
      name: "Unknown Being",
      status: "unknown",
      species: "unknown",
      type: "unknown",
      gender: "unknown",
      origin: { name: "unknown", url: "" },
      location: { name: "unknown", url: "" },
      image: "",
      url: "",
      episode: [],
      created: "",
    } as Character;

    const result = mapCharacterToCSVObject(character);

    expect(result).toEqual({
      id: 3,
      name: "Unknown Being",
      status: "unknown",
      species: "unknown",
      gender: "unknown",
      origin: "unknown",
      location: "unknown",
    });
  });
});
