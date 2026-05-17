import { useEffect, useState } from 'react';
import type { Character } from '../../../../shared/api/types';
import CharacterDetail from '../../ui/character-detail';
import { useOutletContext, useParams } from 'react-router';

type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

type Context = {
  onClose: () => void;
};

type State = LoadingState<Character>;

export default function CharacterSidebar() {
  const { id } = useParams();
  const characterId = id ? Number(id) : null;
  const { onClose } = useOutletContext<Context>();

  const [state, setState] = useState<State>(() => ({ status: 'idle' }));

  useEffect(() => {
    if (characterId === null) {
      return;
    }

    const fetchCharacter = async () => {
      setState({ status: 'loading' });
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch character details');
        }
        const data: Character = await response.json();
        setState({ status: 'success', data });
      } catch (error) {
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    fetchCharacter();
  }, [characterId]);

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
        {state.status === 'error' && <p>Error: {state.error.message}</p>}
        {state.status === 'success' && (
          <CharacterDetail character={state.data} />
        )}
      </div>
    </div>
  );
}
