import { getCharacters } from "@entities/character/api/get-characters";
import CharactersPageClient from "./characters-page-client";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string }>;
}): Promise<React.JSX.Element> {
  const { page = "1", name = "" } = await searchParams;
  const filters = { page: Number(page), name };
  const data = await getCharacters(filters);

  return (
    <CharactersPageClient
      characters={data.results ?? []}
      totalPages={data.info?.pages ?? 1}
      page={Number(page)}
      query={name}
    />
  );
}
