"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination, Main, Flyout } from "@shared/ui";
import { ErrorDisplay } from "@shared/ui/error";
import { CharacterList, type Character } from "@entities/character";
import { CharacterDetailsPanel } from "@widgets/character-details-panel";
import { useCharacterSelection } from "@features/character-selection";
import { SearchForm } from "@features/search-character";
import { useCharacterDetails } from "@widgets/character-details-panel/model";
import { usePaginationParam } from "@shared/lib/hooks/universal";

interface Props {
  characters?: Character[];
  totalPages?: number;
  page?: number;
  query?: string;
  detailCharacter?: Character;
  error?: string | null;
}

export function CharacterCatalog({
  characters = [],
  totalPages = 1,
  page = 1,
  query = "",
  detailCharacter,
  error,
}: Props): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedIds, toggleSelection, unselectAll, handleDownload } =
    useCharacterSelection();
  const { handleViewDetails } = useCharacterDetails();
  const { prevHref, nextHref } = usePaginationParam({
    totalPages,
  });

  const handleCloseDetails = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("details");
    router.push(`/characters?${next.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const restoreId = sessionStorage.getItem("focusRestoreId");
    if (restoreId && searchParams.has("details")) {
      sessionStorage.removeItem("focusRestoreId");

      requestAnimationFrame(() => {
        const btn = document.getElementById(`details-btn-${restoreId}`);
        btn?.focus();
      });
    }
  }, [searchParams]);

  const master = (
    <Main>
      <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
        <div className="p-4 sm:p-5 lg:p-6">
          <SearchForm query={query} />
        </div>
      </section>
      {error ? (
        <section className="rounded-lg bg-white/80 dark:bg-neutral-800/60">
          <div className="flex items-center justify-center py-16">
            <ErrorDisplay message={error} />
          </div>
        </section>
      ) : (
        <section className="rounded-lg bg-white/80 pb-2 dark:bg-neutral-800/60">
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
              handleDownload();
            }}
          />
        </section>
      )}
    </Main>
  );

  return (
    <>
      {master}
      {detailCharacter && (
        <CharacterDetailsPanel
          character={detailCharacter}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
}
