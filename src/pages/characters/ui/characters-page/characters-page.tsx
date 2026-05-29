import { useEffect, useRef } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import {
  Search,
  Spinner,
  Pagination,
  Main,
  ErrorDisplay,
  QueryMatch,
} from "@shared/ui";
import { useLocalStorage } from "@shared/lib";
import {
  useSelectedIds,
  useToggleCharacter,
  useUnselectAllCharacters,
} from "@features/characters";
import {
  useCharactersQuery,
  mapCharacterToCSVObject,
  CHARACTER_CSV_COLUMNS,
} from "@entities/character";
import { CharacterList, Flyout } from "@features/characters";
import { ROUTES } from "@shared/routes";
import { updateSearchParams, downloadCSV } from "@shared/lib";
import { useQueryClient } from "@tanstack/react-query";
import { charactersByIdQueryOptions } from "@entities/character/api";
import { usePrefetchAdjacentPages } from "@pages/characters/lib";

const CHARACTER_QUERY_STORAGE_KEY = "characterQuery";

export function CharactersPage(): React.JSX.Element {
  const selectedIds = useSelectedIds();
  const toggleSelection = useToggleCharacter();
  const unselectAll = useUnselectAllCharacters();
  const count = selectedIds.length;
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage(
    CHARACTER_QUERY_STORAGE_KEY,
    "",
  );
  const name = params.get("name") ?? searchQuery;
  const page = Number(params.get("page")) || 1;
  const charactersQuery = useCharactersQuery({ name, page });
  const queryClient = useQueryClient();
  const hasRestored = useRef(false);
  const focusRef = useRef<number | null>(null);
  usePrefetchAdjacentPages({
    page,
    name,
    totalPages: charactersQuery.data?.info?.pages ?? 1,
  });

  useEffect(() => {
    const id = focusRef.current;
    if (id === null) return;
    if (location.pathname === ROUTES.CHARACTERS) {
      document.getElementById(`details-btn-${String(id)}`)?.focus();
      focusRef.current = null;
    }
  }, [location.pathname]);

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
    setParams((prev) => updateSearchParams(prev, { page: String(page - 1) }));
  };

  const handleNext = () => {
    const totalPages = charactersQuery.data?.info?.pages ?? 1;
    if (page >= totalPages) return;
    const newPage = page + 1;
    setParams((prev) => updateSearchParams(prev, { page: String(newPage) }));
  };

  const handleSearch = (query: string) => {
    if (query === name && !charactersQuery.isError && page === 1) {
      return;
    }
    setParams((prev) =>
      updateSearchParams(prev, {
        name: query || null,
        page: "1",
      }),
    );
    setSearchQuery(query);
  };

  const handleCharacterSelect = (characterId: number) => {
    focusRef.current = characterId;
    void navigate(
      `${ROUTES.CHARACTERS_DETAILS(String(characterId))}${location.search}`,
    );
  };

  const handleSidebarClose = () => {
    void navigate(`${ROUTES.CHARACTERS}${location.search}`);
  };

  const handleDownload = async () => {
    const selectedCharacters = await queryClient.fetchQuery(
      charactersByIdQueryOptions(selectedIds),
    );
    const rows = selectedCharacters.map(mapCharacterToCSVObject);
    downloadCSV(
      rows,
      CHARACTER_CSV_COLUMNS,
      `${String(selectedCharacters.length)}_items.csv`,
    );
  };
  return (
    <>
      <Main
        className={count > 0 ? "pb-32 sm:pb-16 md:pb-14 lg:pb-10" : undefined}
      >
        <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
          <div className="p-4 sm:p-5 lg:p-6">
            <Search key={name} onSubmit={handleSearch} query={name} />
          </div>
        </section>
        <section className="rounded-lg bg-white/80 dark:bg-neutral-800/60">
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
                    onViewDetails={handleCharacterSelect}
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
        </section>
        {count > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 flex w-full justify-center">
            <div className="w-full max-w-4xl rounded-t-xl">
              <Flyout
                count={count}
                onUnselectAll={unselectAll}
                onDownload={handleDownload}
              />
            </div>
          </div>
        )}
      </Main>
      <Outlet context={{ onClose: handleSidebarClose }} />
    </>
  );
}
