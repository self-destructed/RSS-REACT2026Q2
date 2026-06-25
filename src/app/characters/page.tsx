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
  const data = await getCharacters(filters).catch(() => null);

  const error = data ? null : "Failed to load characters. Please try again.";

  let detailCharacter: Character | undefined;
  if (!error && details) {
    const id = Number(details);
    if (Number.isFinite(id)) {
      detailCharacter = await getCharacter(id).catch(() => undefined);
    }
  }

  return (
    <CharacterCatalog
      characters={data?.results ?? []}
      totalPages={data?.info?.pages ?? 1}
      page={Number(page)}
      query={name}
      detailCharacter={detailCharacter}
      error={error}
    />
  );
}
