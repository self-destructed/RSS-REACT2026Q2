import { CharacterCard } from "../character-card";
import type { Character } from "../../model";

interface Props {
  data: Character[];
  selectedIds: number[];
  onToggleSelection?: (id: number) => void;
  onViewDetails?: (id: number) => void;
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
            data={item}
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
