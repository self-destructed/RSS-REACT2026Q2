import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { clamp } from "@shared/lib";

interface Props {
  totalPages: number;
  initialPage?: number;
}

interface UseCharacterNavigationReturn {
  page: number;
  handleNext: () => void;
  handlePrev: () => void;
  setPage: (pageNumber: number) => void;
}

export function useCharacterNavigation({
  totalPages,
  initialPage,
}: Props): UseCharacterNavigationReturn {
  const [params, setParams] = useSearchParams();

  const page =
    initialPage !== undefined
      ? clamp(initialPage, 1, totalPages)
      : Number(params.get("page")) || 1;

  useEffect(() => {
    if (params.has("page")) return;

    setParams((prev) => {
      prev.set("page", String(initialPage ?? 1));
      return prev;
    });
  }, [params, setParams, initialPage]);

  const setPage = (pageNumber: number) => {
    const clampedPage = clamp(pageNumber, 1, totalPages);

    setParams((prev) => {
      prev.set("page", String(clampedPage));
      return prev;
    });
  };

  const handlePrev = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    if (page >= totalPages) return;
    setPage(page + 1);
  };

  return {
    page,
    handleNext,
    handlePrev,
    setPage,
  };
}
