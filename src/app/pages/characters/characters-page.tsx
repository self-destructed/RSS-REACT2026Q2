import { useEffect } from "react";
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
  Flyout,
} from "@shared/ui";
import { useLocalStorage } from "@shared/hooks";
import { useSelectedCharactersStore } from "@shared/store";
import { CharacterList } from "@features/characters/ui";
import { updateSearchParams } from "@shared/utils";
import { downloadCsv } from "@features/characters/utils";
import { useCharacters } from "@features/characters/hooks";

const CHARACTER_QUERY_STORAGE_KEY = "characterQuery";

export function CharactersPage(): React.JSX.Element {
  const { selectedIds, toggle, unselectAll } = useSelectedCharactersStore();
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
  const state = useCharacters({ name, page });

  useEffect(() => {
    const urlName = params.get("name");
    if (searchQuery && !urlName) {
      setParams((prev) =>
        updateSearchParams(prev, {
          name: searchQuery,
          page: "1",
        }),
      );
    }
  }, [params, searchQuery, setParams]);

  const handlePrev = () => {
    if (page <= 1) return;
    setParams((prev) => updateSearchParams(prev, { page: String(page - 1) }));
  };

  const handleNext = () => {
    const newPage = page + 1;
    setParams((prev) => updateSearchParams(prev, { page: String(newPage) }));
  };

  const handleSearch = (query: string) => {
    if (query === name && state.status !== "error") {
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
    void navigate(`/characters/${String(characterId)}${location.search}`);
  };

  const handleSidebarClose = () => {
    void navigate(`/characters${location.search}`);
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
          <div className="p-4 sm:p-5 lg:p-6">
            {state.status === "loading" && (
              <div className="flex justify-center py-6">
                <Spinner />
              </div>
            )}
            {state.status === "error" && (
              <ErrorDisplay message={state.error.message} />
            )}
            {state.status === "success" && (
              <CharacterList
                data={state.data.results ?? []}
                onSelect={handleCharacterSelect}
                selectedIds={selectedIds}
                onToggle={toggle}
              />
            )}
          </div>
          {state.status === "success" && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={state.data.info?.pages ?? 1}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </div>
          )}
        </section>
        {count > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 flex w-full justify-center">
            <div className="w-full max-w-4xl rounded-t-xl">
              <Flyout
                count={count}
                onUnselectAll={unselectAll}
                onDownload={() => {
                  void downloadCsv(selectedIds);
                }}
              />
            </div>
          </div>
        )}
      </Main>
      <Outlet context={{ onClose: handleSidebarClose }} />
    </>
  );
}
