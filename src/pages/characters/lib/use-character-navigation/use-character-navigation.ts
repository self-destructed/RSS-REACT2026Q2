"use client";

import { useEffect, useRef, useState } from "react";
import { clamp } from "@shared/lib";
import { usePathname, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const pathname = usePathname() ?? "";

  const searchParamsRef = useRef(searchParams);

  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const [page, setPage] = useState(() => {
    return clamp(
      (initialPage ?? Number(searchParams?.get("page"))) || 1,
      1,
      totalPages,
    );
  });

  const handleSetPage = (pageNumber: number) => {
    const clampedPage = clamp(pageNumber, 1, totalPages);

    setPage(clampedPage);
  };

  useEffect(() => {
    const params = new URLSearchParams(
      searchParamsRef.current?.toString() ?? "",
    );

    params.set("page", String(page));

    history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }, [page, pathname]);

  const handlePrev = () => {
    if (page <= 1) return;

    handleSetPage(page - 1);
  };

  const handleNext = () => {
    if (page >= totalPages) return;

    handleSetPage(page + 1);
  };

  return {
    page,
    handleNext,
    handlePrev,
    setPage: handleSetPage,
  };
}
