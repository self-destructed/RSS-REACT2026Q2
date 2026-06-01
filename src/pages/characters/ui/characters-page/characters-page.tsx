import { Outlet } from "react-router";
import {
  Search,
  Spinner,
  Pagination,
  Main,
  ErrorDisplay,
  QueryMatch,
} from "@shared/ui";
import {
  useCharacterSelection,
  CharacterList,
  Flyout,
} from "@features/characters";
import { useCharacterDetails, useCharactersPageData } from "../../lib";

export function CharactersPage(): React.JSX.Element {
  const { selectedIds, toggleSelection, unselectAll, handleDownload } =
    useCharacterSelection();
  const { handleViewDetails, handleSidebarClose } = useCharacterDetails();
  const {
    query,
    page,
    charactersQuery,
    handleQueryChange,
    handleNext,
    handlePrev,
    handleRefresh,
  } = useCharactersPageData();

  return (
    <>
      <Main>
        <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
          <div className="p-4 sm:p-5 lg:p-6">
            <Search onSubmit={handleQueryChange} query={query} />
          </div>
        </section>
        <section className="rounded-lg bg-white/80 dark:bg-neutral-800/60 pb-2">
          <QueryMatch
            query={charactersQuery}
            loading={
              <div className="flex justify-center py-6">
                <Spinner />
              </div>
            }
            error={(e) => <ErrorDisplay message={e.message} />}
          >
            {(data) => (
              <>
                <div className="p-4 sm:p-5 lg:p-6">
                  <CharacterList
                    data={data.results ?? []}
                    onViewDetails={handleViewDetails}
                    selectedIds={selectedIds}
                    onToggleSelection={toggleSelection}
                  />
                </div>
                <div className="mb-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="rounded p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white cursor-pointer"
                    aria-label="Refresh"
                  >
                    ↻
                  </button>
                </div>
                <div className="mt-4 flex justify-center">
                  <Pagination
                    currentPage={page}
                    totalPages={data.info?.pages ?? 1}
                    onPrev={handlePrev}
                    onNext={handleNext}
                  />
                </div>
              </>
            )}
          </QueryMatch>
          <Flyout
            count={selectedIds.length}
            onUnselectAll={unselectAll}
            onDownload={() => {
              void handleDownload();
            }}
          />
        </section>
      </Main>
      <Outlet context={{ onClose: handleSidebarClose }} />
    </>
  );
}
