"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { clamp } from "@shared/lib/math";

interface UsePaginationParamProps {
  totalPages: number;
  paramKey?: string;
}

interface UsePaginationParamReturn {
  page: number;
  handleNext: () => void;
  handlePrev: () => void;
  setPage: (pageNumber: number) => void;
}

export function usePaginationParam({
  totalPages,
  paramKey = "page",
}: UsePaginationParamProps): UsePaginationParamReturn {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const page = clamp(Number(searchParams?.get(paramKey)) || 1, 1, totalPages);

  function setPage(pageNumber: number) {
    const clampedPage = clamp(pageNumber, 1, totalPages);
    const next = new URLSearchParams(searchParams?.toString() ?? "");

    next.set(paramKey, String(clampedPage));

    router.push(`${pathname}?${next.toString()}`);
  }

  function handlePrev() {
    if (page <= 1) return;
    setPage(page - 1);
  }

  function handleNext() {
    if (page >= totalPages) return;
    setPage(page + 1);
  }

  return {
    page,
    handleNext,
    handlePrev,
    setPage,
  };
}
