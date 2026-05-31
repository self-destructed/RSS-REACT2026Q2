import { useEffect, useRef } from "react";
import { Outlet, useSearchParams } from "react-router";
import {
  Search,
  Spinner,
  Pagination,
  Main,
  ErrorDisplay,
  QueryMatch,
} from "@shared/ui";
import { useLocalStorage } from "@shared/lib";
import { useSelectedIds, useToggleCharacter } from "@features/characters";
import { useCharactersQuery } from "@entities/character";
import { CharacterList, Flyout } from "@features/characters";
import { updateSearchParams } from "@shared/lib";
import { useCharacterDetails, usePrefetchAdjacentPages } from "../../lib";

const CHARACTER_QUERY_STORAGE_KEY = "characterQuery";

export function CharactersPage(): React.JSX.Element {
  const selectedIds = useSelectedIds();
  const [params, setParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage(
    CHARACTER_QUERY_STORAGE_KEY,
    "",
  );
  const name = params.get("name") ?? searchQuery;
  const page = Number(params.get("page")) || 1;
  const charactersQuery = useCharactersQuery({ name, page });
  const hasRestored = useRef(false);
  usePrefetchAdjacentPages({
    page,
    name,
    totalPages: charactersQuery.data?.info?.pages ?? 1,
  });
  const toggleSelection = useToggleCharacter();
  const { handleViewDetails, handleSidebarClose } = useCharacterDetails();

  useEffect(() => {
    if (hasRestored.current || !searchQuery || params.get("name")) return;
    hasRestored.current = true;
    setParams((prev) =>
      updateSearchParams(prev, {
        name: searchQuery,
        page: "1",
      }),
    );
  }, [searchQuery, params, setParams]);

  const handlePrev = () => {
    if (page <= 1) return;
    setParams((prev) => {
      prev.set("page", String(page - 1));
      return prev;
    });
  };

  const handleNext = () => {
    const totalPages = charactersQuery.data?.info?.pages ?? 1;
    if (page >= totalPages) return;
    setParams((prev) => {
      prev.set("page", String(page + 1));
      return prev;
    });
  };

  const handleSearch = (query: string) => {
    if (query === name && !charactersQuery.isError && page === 1) {
      return;
    }
    setParams((prev) => {
      prev.set("name", query || "");
      prev.set("page", "1");
      setSearchQuery(query);

      return prev;
    });
  };

  return (
    <>
      <Main>
        <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
          <div className="p-4 sm:p-5 lg:p-6">
            <Search key={name} onSubmit={handleSearch} query={name} />
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
