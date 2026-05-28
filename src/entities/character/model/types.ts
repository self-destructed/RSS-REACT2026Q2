import type { ResourceBase } from "@shared/api";

export type Species =
  | "Human"
  | "Alien"
  | "Humanoid"
  | "Animal"
  | "Robot"
  | "Disease"
  | "Cronenberg"
  | "Mythological Creature"
  | "Poopybutthole"
  | (string & {});

export type Gender =
  | "Female"
  | "Male"
  | "Genderless"
  | "unknown"
  | (string & {});

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface CharacterFilter {
  name?: string;
  type?: string;
  species?: Species;
  status?: "Alive" | "Dead" | "unknown";
  gender?: Gender;
  page?: number;
}

export type CharacterId = Character["id"];

export interface Character extends ResourceBase {
  status: "Alive" | "Dead" | "unknown";
  species: Species;
  type: string;
  gender: Gender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}
