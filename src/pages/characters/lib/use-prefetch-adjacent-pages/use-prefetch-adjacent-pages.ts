import { charactersQueryOptions } from "@entities/character";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface Props {
  name: string;
  page: number;
  totalPages: number;
}

export function usePrefetchAdjacentPages({
  name: _name,
  page: _page,
  totalPages: _totalPages,
}: Props): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (_page <= 1 || _page >= _totalPages) {
      return;
    }

    void queryClient.prefetchQuery(
      charactersQueryOptions({ name: _name, page: _page + 1 }),
    );
    void queryClient.prefetchQuery(
      charactersQueryOptions({ name: _name, page: _page - 1 }),
    );
  }, [_name, _page, _totalPages, queryClient]);
}
