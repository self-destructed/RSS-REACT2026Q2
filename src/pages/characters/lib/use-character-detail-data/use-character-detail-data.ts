import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  useCharacterQuery,
  characterQueryOptions,
  type Character,
} from "@entities/character";
import { type UseQueryResult } from "@tanstack/react-query";

interface UseCharacterDetailDataReturn {
  query: UseQueryResult<Character>;
  handleRefresh: () => void;
  characterId: number | undefined;
}

export function useCharacterDetailData(): UseCharacterDetailDataReturn {
  const { id } = useParams();
  const parsedId = Number(id);
  const characterId = id && Number.isFinite(parsedId) ? parsedId : undefined;
  const queryClient = useQueryClient();
  const query = useCharacterQuery(characterId);

  const handleRefresh = () => {
    void queryClient.invalidateQueries({
      queryKey: characterQueryOptions(characterId).queryKey,
    });
  };

  return { query, handleRefresh, characterId };
}
