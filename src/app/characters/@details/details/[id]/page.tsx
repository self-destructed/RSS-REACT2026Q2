import type { Character } from "@entities/character";
import { getCharacter } from "@entities/character/api/get-characters";
import CharacterDetailsClient from "./character-details-client";

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
  const { id } = await params;
  const characterId = Number(id);
  let character: Character | undefined;

  if (Number.isFinite(characterId)) {
    character = await getCharacter(characterId);
  }

  return <CharacterDetailsClient character={character} />;
}
