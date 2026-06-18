"use client";

import { usePaginationParam } from "@shared/lib/hooks/use-pagination-param";

interface UseCharacterNavigationProps {
  totalPages: number;
  initialPage: number;
}

interface UseCharacterNavigationReturn {
  handleNext: () => void;
  handlePrev: () => void;
  setPage: (pageNumber: number) => void;
}

export function useCharacterNavigation({
  totalPages,
}: UseCharacterNavigationProps): UseCharacterNavigationReturn {
  return usePaginationParam({ totalPages });
}
