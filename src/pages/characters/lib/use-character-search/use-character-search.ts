import { useLocalStorage } from "@shared/lib";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

interface Props {
  lsKey?: string;
}

interface UseCharacterSearchReturn {
  query: string;
  handleQueryChange: (newQuery: string) => void;
}

export function useCharacterSearch({ lsKey }: Props): UseCharacterSearchReturn {
  const [params, setParams] = useSearchParams();
  const [savedQuery, setSavedQuery] = useLocalStorage(lsKey ?? "", "");
  const query = params.get("name") ?? savedQuery;

  useEffect(() => {
    const urlName = params.get("name");

    if (urlName) {
      return;
    }

    if (savedQuery) {
      setParams((prev) => {
        prev.set("name", savedQuery);
        return prev;
      });
    }
  }, [params, setParams, savedQuery, setSavedQuery]);

  const handleQueryChange = (newQuery: string) => {
    setParams((prev) => {
      if (newQuery) {
        prev.set("name", newQuery);
      } else {
        prev.delete("name");
      }

      prev.set("page", "1");

      return prev;
    });

    setSavedQuery(newQuery);
  };

  return { query, handleQueryChange };
}
