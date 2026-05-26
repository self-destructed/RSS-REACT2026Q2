import { CharacterDetail, useCharacter } from "@entities/character";
import { useOutletContext, useParams } from "react-router";
import { Sidebar, Spinner, MatchState } from "@shared/ui";

interface Context {
  onClose: () => void;
}

export function CharacterDetailPage(): React.JSX.Element {
  const { id } = useParams();
  const { onClose } = useOutletContext<Context>();
  const characterId = id !== undefined ? Number(id) : null;
  const state = useCharacter(characterId);

  return (
    <Sidebar onClose={onClose} title="Character Details">
      <MatchState
        state={state}
        loading={
          <div>
            <Spinner />
          </div>
        }
        error={(e) => <p>Error: {e.message}</p>}
      >
        {(data) => <CharacterDetail character={data} />}
      </MatchState>
    </Sidebar>
  );
}
