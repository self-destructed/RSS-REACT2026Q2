"use client";

import { useCallback } from "react";
import { useUrlParam } from "@shared/lib/hooks/universal";
import { useLocalStorage } from "@shared/lib/hooks/client";

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
