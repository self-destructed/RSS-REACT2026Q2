import type { Character } from "../../model";

export interface CharacterCSVObject {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
}

export const CHARACTER_CSV_COLUMNS: readonly (keyof CharacterCSVObject)[] = [
  "id",
  "name",
  "status",
  "species",
  "gender",
  "origin",
  "location",
] as const;

export function mapCharacterToCSVObject(
  character: Character,
): CharacterCSVObject {
  return {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    gender: character.gender,
    origin: character.origin.name,
    location: character.location.name,
  };
}
