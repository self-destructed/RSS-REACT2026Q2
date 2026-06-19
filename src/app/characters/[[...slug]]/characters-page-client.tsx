"use client";

import type { Character } from "@entities/character";
import { CharacterCatalog } from "@widgets/character-catalog";

interface Props {
  characters: Character[];
  totalPages: number;
  page: number;
  query: string;
}

export default function CharactersPageClient({
  characters,
  totalPages,
  page,
  query,
}: Props): React.JSX.Element {
  return (
    <CharacterCatalog
      characters={characters}
      totalPages={totalPages}
      page={page}
      query={query}
    />
  );
}
