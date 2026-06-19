import { CharacterCard } from "../character-card";
import type { Character, CharacterId } from "../../model";

interface Props {
  data: Character[];
  selectedIds: CharacterId[];
  onToggleSelection?: (id: CharacterId) => void;
  onViewDetails?: (id: CharacterId) => void;
}
export function CharacterList({
  data,
  selectedIds,
  onToggleSelection,
  onViewDetails,
}: Props): React.JSX.Element {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {data.map((item) => (
        <li key={item.id}>
          <CharacterCard
            character={item}
            isSelected={selectedIds.includes(item.id)}
            onToggleSelection={() => {
              onToggleSelection?.(item.id);
            }}
            onViewDetails={() => {
              onViewDetails?.(item.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
