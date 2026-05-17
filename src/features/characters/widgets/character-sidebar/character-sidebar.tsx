import CharacterDetail from '../../ui/character-detail';
import { useOutletContext, useParams } from 'react-router';
import { useCharacter } from '../../hooks';

type Context = {
  onClose: () => void;
};

export default function CharacterSidebar() {
  const { id } = useParams();
  const { onClose } = useOutletContext<Context>();

  const characterId = id ? Number(id) : null;
  const state = useCharacter(characterId);

  return (
    <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-xl dark:bg-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-700">
        <h2 className="text-xl font-semibold">Character Details</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="p-4">
        {state.status === 'loading' && <p>Loading...</p>}
        {state.status === 'error' && <p>Error: {state.error?.message}</p>}
        {state.status === 'success' && state.data && (
          <CharacterDetail character={state.data} />
        )}
      </div>
    </div>
  );
}
