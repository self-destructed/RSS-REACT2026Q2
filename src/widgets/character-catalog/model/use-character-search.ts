"use client";

import { useCallback } from "react";
import { useUrlParam } from "@shared/lib/hooks/use-url-param";
import { useLocalStorage } from "@shared/lib";

interface Props {
  lsKey: string;
}

interface Return {
  query: string;
  handleQueryChange: (newQuery: string) => void;
}

export function useCharacterSearch({ lsKey }: Props): Return {
  const [query, setQuery] = useUrlParam("name");
  const [, setLastQuery] = useLocalStorage<string>(lsKey, "");

  console.log("se");

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setLastQuery(newQuery);
      setQuery(newQuery);
    },
    [setLastQuery, setQuery],
  );

  return { query, handleQueryChange };
}
