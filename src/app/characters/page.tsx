import {
  getCharacters,
  getCharacter,
} from "@entities/character/api/get-characters";
import { CharacterCatalog } from "@widgets/character-catalog";
import type { Character } from "@entities/character";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string; details?: string }>;
}): Promise<React.JSX.Element> {
  const { page = "1", name = "", details } = await searchParams;
  const filters = { page: Number(page), name };
  const data = await getCharacters(filters);

  let detailCharacter: Character | undefined;
  if (details) {
    const id = Number(details);
    if (Number.isFinite(id)) {
      detailCharacter = await getCharacter(id);
    }
  }

  return (
    <CharacterCatalog
      characters={data.results ?? []}
      totalPages={data.info?.pages ?? 1}
      page={Number(page)}
      query={name}
      detailCharacter={detailCharacter}
    />
  );
}
