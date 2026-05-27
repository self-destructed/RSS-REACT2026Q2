import { CharacterDetail, useCharacterQuery } from "@entities/character";
import { useOutletContext, useParams } from "react-router";
import { Sidebar, Spinner, QueryMatch } from "@shared/ui";

interface Context {
  onClose: () => void;
}

export function CharacterDetailPage(): React.JSX.Element {
  const { id } = useParams();
  const { onClose } = useOutletContext<Context>();
  const query = useCharacterQuery(id);

  return (
    <Sidebar onClose={onClose} title="Character Details">
      <QueryMatch
        key={id}
        query={query}
        loading={
          <div>
            <Spinner />
          </div>
        }
        error={(e) => <p>Error: {e.message}</p>}
      >
        {(data) => <CharacterDetail character={data} />}
      </QueryMatch>
    </Sidebar>
  );
}
