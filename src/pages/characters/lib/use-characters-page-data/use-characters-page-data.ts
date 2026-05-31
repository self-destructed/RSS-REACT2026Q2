import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCharactersQuery,
  charactersQueryOptions,
} from "@entities/character";
import { useCharacterSearch, useCharacterNavigation } from "..";

const CHARACTER_QUERY_STORAGE_KEY = "characterQuery";

interface UseCharactersPageDataReturn {
  query: string;
  page: number;
  handleQueryChange: (newQuery: string) => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleRefresh: () => void;
  charactersQuery: ReturnType<typeof useCharactersQuery>;
}

export function useCharactersPageData(): UseCharactersPageDataReturn {
  const queryClient = useQueryClient();
  const { query, handleQueryChange: searchHandleQueryChange } =
    useCharacterSearch({
      lsKey: CHARACTER_QUERY_STORAGE_KEY,
    });
  const [params] = useSearchParams();
  const page = Number(params.get("page")) || 1;

  const charactersQuery = useCharactersQuery({ name: query, page });
  const totalPages = charactersQuery.data?.info?.pages ?? 1;

  const { handleNext, handlePrev, setPage } = useCharacterNavigation({
    totalPages,
    initialPage: page,
    name: query,
  });

  const handleQueryChange = (newQuery: string) => {
    searchHandleQueryChange(newQuery);
    setPage(1);
  };

  const handleRefresh = () => {
    void queryClient.invalidateQueries({
      queryKey: charactersQueryOptions({ name: query, page }).queryKey,
    });
  };

  return {
    query,
    page,
    charactersQuery,
    handleQueryChange,
    handleNext,
    handlePrev,
    handleRefresh,
  };
}
