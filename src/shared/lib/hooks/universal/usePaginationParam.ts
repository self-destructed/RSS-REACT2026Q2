"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { clamp } from "@shared/lib/math";

interface UsePaginationParamProps {
  totalPages: number;
  paramKey?: string;
}

interface UsePaginationParamReturn {
  page: number;
  prevHref: string | null;
  nextHref: string | null;
  getPageHref: (pageNumber: number) => string;
}

export function usePaginationParam({
  totalPages,
  paramKey = "page",
}: UsePaginationParamProps): UsePaginationParamReturn {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = clamp(Number(searchParams.get(paramKey)) || 1, 1, totalPages);

  function buildHref(pageNumber: number): string {
    const clampedPage = clamp(pageNumber, 1, totalPages);
    const next = new URLSearchParams(searchParams.toString());

    next.set(paramKey, String(clampedPage));

    return `${pathname}?${next.toString()}`;
  }

  return {
    page,
    prevHref: page > 1 ? buildHref(page - 1) : null,
    nextHref: page < totalPages ? buildHref(page + 1) : null,
    getPageHref: buildHref,
  };
}
