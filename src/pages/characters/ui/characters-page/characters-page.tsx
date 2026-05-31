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
  useSelectedIds,
  useToggleCharacter,
  CharacterList,
  Flyout,
} from "@features/characters";
import { useCharacterDetails, useCharactersPageData } from "../../lib";

export function CharactersPage(): React.JSX.Element {
  const selectedIds = useSelectedIds();
  const toggleSelection = useToggleCharacter();
  const { handleViewDetails, handleSidebarClose } = useCharacterDetails();
  const {
    query,
    page,
    charactersQuery,
    handleQueryChange,
    handleNext,
    handlePrev,
  } = useCharactersPageData();

  return (
    <>
      <Main>
        <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
          <div className="p-4 sm:p-5 lg:p-6">
            <Search key={query} onSubmit={handleQueryChange} query={query} />
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
          <div className="sticky bottom-0 mt-2 left-0 right-0 z-50 flex w-full justify-center">
            <div className="w-full lg:max-w-4xl rounded-t-xl">
              <Flyout />
            </div>
          </div>
        </section>
      </Main>
      <Outlet context={{ onClose: handleSidebarClose }} />
    </>
  );
}
