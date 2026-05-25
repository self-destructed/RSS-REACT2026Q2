import { CharacterDetail, useCharacter } from "@features/characters";
import { useOutletContext, useParams } from "react-router";
import { CharacterSidebar, Spinner } from "@shared/ui";

interface Context {
  onClose: () => void;
}

export function CharacterDetailPage(): React.JSX.Element {
  const { id } = useParams();
  const { onClose } = useOutletContext<Context>();
  const characterId = id !== undefined ? Number(id) : null;
  const state = useCharacter(characterId);

  return (
    <CharacterSidebar onClose={onClose} title="Character Details">
      {state.status === "loading" && (
        <div>
          <Spinner />
        </div>
      )}
      {state.status === "error" && <p>Error: {state.error.message}</p>}
      {state.status === "success" && <CharacterDetail character={state.data} />}
    </CharacterSidebar>
  );
}
