export type {
  Character,
  CharacterId,
  CharacterFilter,
  CharacterLocation,
  Species,
  Gender,
} from "./model";
export {
  fetchCharacters,
  CHARACTER_API,
  charactersQueryOptions,
  characterQueryOptions,
  useCharactersQuery,
  useCharacterQuery,
} from "./api";
export { CharacterDetail } from "./ui";
