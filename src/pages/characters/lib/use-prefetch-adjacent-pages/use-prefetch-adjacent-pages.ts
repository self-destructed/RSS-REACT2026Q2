"use client";

import { charactersQueryOptions } from "@entities/character";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface Props {
  name: string;
  page: number;
  totalPages: number;
}

export function usePrefetchAdjacentPages({
  name,
  page,
  totalPages,
}: Props): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < 1 || page > totalPages) {
      return;
    }
    if (page > 1) {
      void queryClient.prefetchQuery(
        charactersQueryOptions({ name, page: page - 1 }),
      );
    }
    if (page < totalPages) {
      void queryClient.prefetchQuery(
        charactersQueryOptions({ name, page: page + 1 }),
      );
    }
  }, [name, page, totalPages, queryClient]);
}
