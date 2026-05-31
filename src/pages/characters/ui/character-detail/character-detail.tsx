import { CharacterDetail } from "@entities/character";
import { useOutletContext } from "react-router";
import { ErrorDisplay, Sidebar, Spinner, QueryMatch } from "@shared/ui";
import { useCharacterDetailData } from "../../lib";

interface Context {
  onClose: () => void;
}

export function CharacterDetailPage(): React.JSX.Element {
  const { onClose } = useOutletContext<Context>();
  const { query, handleRefresh, characterId } = useCharacterDetailData();

  return (
    <Sidebar onClose={onClose} title="Character Details">
      <QueryMatch
        key={characterId}
        query={query}
        loading={
          <div>
            <Spinner />
          </div>
        }
        error={(e) => <ErrorDisplay message={e.message} />}
      >
        {(data) => (
          <>
            <CharacterDetail character={data} />
            <div className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={handleRefresh}
                className="rounded p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white cursor-pointer"
                aria-label="Refresh"
              >
                ↻
              </button>
            </div>
          </>
        )}
      </QueryMatch>
    </Sidebar>
  );
}
