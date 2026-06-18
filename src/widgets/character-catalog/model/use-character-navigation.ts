"use client";

import { usePaginationParam } from "@shared/lib/hooks/universal";

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
