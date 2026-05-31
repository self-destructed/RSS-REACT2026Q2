import { useSearchParams } from "react-router";
import { usePrefetchAdjacentPages } from "..";

interface NavigationOptions {
  page: number;
  totalPages: number;
  name: string;
}

interface UseCharacterNavigationReturn {
  handleNext: () => void;
  handlePrev: () => void;
}

export function useCharacterNavigation({
  page,
  totalPages,
  name,
}: NavigationOptions): UseCharacterNavigationReturn {
  const [, setParams] = useSearchParams();

  usePrefetchAdjacentPages({
    page,
    name,
    totalPages,
  });

  const handlePrev = () => {
    if (page <= 1) return;

    setParams((prev) => {
      prev.set("page", String(page - 1));
      return prev;
    });
  };

  const handleNext = () => {
    if (page >= totalPages) return;

    setParams((prev) => {
      prev.set("page", String(page + 1));
      return prev;
    });
  };

  return {
    handleNext,
    handlePrev,
  };
}
