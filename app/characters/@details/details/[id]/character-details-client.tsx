"use client";

import type { Character } from "@entities/character";
import { CharacterDetailsPanel } from "@widgets/character-details-panel";

interface Props {
  character: Character | undefined;
}

export default function CharacterDetailsClient({
  character,
}: Props): React.JSX.Element {
  return <CharacterDetailsPanel character={character} />;
}
