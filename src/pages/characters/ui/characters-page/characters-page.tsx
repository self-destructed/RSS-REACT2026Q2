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
import { useFocusRestore, useLocalStorage } from "@shared/lib";
import { useSelectedIds, useToggleCharacter } from "@features/characters";
import { useCharactersQuery } from "@entities/character";
import { CharacterList, Flyout } from "@features/characters";
import { ROUTES } from "@shared/routes";
import { updateSearchParams } from "@shared/lib";
import { usePrefetchAdjacentPages } from "../../lib";

const CHARACTER_QUERY_STORAGE_KEY = "characterQuery";

export function CharactersPage(): React.JSX.Element {
  const selectedIds = useSelectedIds();
  const toggleSelection = useToggleCharacter();
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
  const hasRestored = useRef(false);
  usePrefetchAdjacentPages({
    page,
    name,
    totalPages: charactersQuery.data?.info?.pages ?? 1,
  });
  const setFocusId = useFocusRestore(location.pathname === ROUTES.CHARACTERS);

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
    setFocusId(`details-btn-${String(characterId)}`);
    void navigate(
      `${ROUTES.CHARACTERS_DETAILS(String(characterId))}${location.search}`,
    );
  };

  const handleSidebarClose = () => {
    void navigate(`${ROUTES.CHARACTERS}${location.search}`);
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
