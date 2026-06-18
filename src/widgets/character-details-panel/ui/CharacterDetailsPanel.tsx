import { useRouter } from "next/navigation";
import { CharacterDetail, type Character } from "@entities/character";
import { Sidebar } from "@shared/ui";

interface Props {
  character?: Character;
}

export function CharacterDetailsPanel({ character }: Props): React.JSX.Element {
  const router = useRouter();

  if (!character) {
    return (
      <Sidebar
        onClose={() => {
          router.back();
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
        router.back();
      }}
      title="Character Details"
    >
      <CharacterDetail character={character} />
    </Sidebar>
  );
}
