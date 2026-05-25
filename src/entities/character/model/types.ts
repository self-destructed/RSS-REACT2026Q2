import type { ResourceBase } from "@shared/api";

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface CharacterFilter {
  name?: string;
  type?: string;
  species?: string;
  status?: string;
  gender?: string;
  page?: number;
}

export interface Character extends ResourceBase {
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}
