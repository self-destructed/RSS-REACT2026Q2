import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Pagination, Main, Flyout } from "@shared/ui";
import { CharacterList, type Character } from "@entities/character";
import { useCharacterSelection } from "@features/character-selection";
import { useCharacterDetails } from "@widgets/character-details-panel/model";
import { usePaginationParam } from "@shared/lib/hooks/universal";

interface Props {
  characters?: Character[];
  totalPages?: number;
  page?: number;
  query?: string;
}

export function CharacterCatalog({
  characters = [],
  totalPages = 1,
  page = 1,
  query = "",
}: Props): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { selectedIds, toggleSelection, unselectAll, handleDownload } =
    useCharacterSelection();
  const { handleViewDetails } = useCharacterDetails();
  const { prevHref, nextHref } = usePaginationParam({
    totalPages,
  });

  useEffect(() => {
    const restoreId = sessionStorage.getItem("focusRestoreId");
    if (restoreId && !pathname?.includes("/details/")) {
      sessionStorage.removeItem("focusRestoreId");

      requestAnimationFrame(() => {
        const btn = document.getElementById(`details-btn-${restoreId}`);
        btn?.focus();
      });
    }
  }, [pathname]);

  const handleQueryChange = (newQuery: string) => {
    const next = new URLSearchParams(searchParams?.toString() ?? "");
    next.set("name", newQuery);
    next.set("page", "1");
    router.push(`/characters?${next.toString()}`);
  };

  return (
    <>
      <Main>
        <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
          <div className="p-4 sm:p-5 lg:p-6">
            <Search onSubmit={handleQueryChange} query={query} />
          </div>
        </section>
        <section className="rounded-lg bg-white/80 dark:bg-neutral-800/60 pb-2">
          <div className="p-4 sm:p-5 lg:p-6">
            <CharacterList
              data={characters}
              onViewDetails={handleViewDetails}
              selectedIds={selectedIds}
              onToggleSelection={toggleSelection}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              prevHref={prevHref}
              nextHref={nextHref}
            />
          </div>
          <Flyout
            count={selectedIds.length}
            onUnselectAll={unselectAll}
            onDownload={() => {
              void handleDownload();
            }}
          />
        </section>
      </Main>
    </>
  );
}
