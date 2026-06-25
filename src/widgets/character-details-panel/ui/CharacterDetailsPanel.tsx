import { CharacterDetail, type Character } from "@entities/character";
import { Sidebar } from "@shared/ui";

interface Props {
  character?: Character;
  onClose?: () => void;
}

export function CharacterDetailsPanel({
  character,
  onClose,
}: Props): React.JSX.Element {
  if (!character) {
    return (
      <Sidebar
        onClose={() => {
          onClose?.();
        }}
        title="Character Details"
      >
        <p className="p-4 text-neutral-500">Character not found</p>
      </Sidebar>
    );
  }

  return (
    <Sidebar
      onClose={() => {
        onClose?.();
      }}
      title="Character Details"
    >
      <CharacterDetail character={character} />
    </Sidebar>
  );
}
