import { getCharacters } from "@entities/character/api/get-characters";
import { CharacterCatalog } from "@widgets/character-catalog";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string }>;
}): Promise<React.JSX.Element> {
  const { page = "1", name = "" } = await searchParams;
  const filters = { page: Number(page), name };
  const data = await getCharacters(filters);

  return (
    <CharacterCatalog
      characters={data.results ?? []}
      totalPages={data.info?.pages ?? 1}
      page={Number(page)}
      query={name}
    />
  );
}
