import { CharacterCard } from "../character-card";
import type { Character } from "@entities/character";

interface Props {
  onSelect?: (id: number) => void;
  data: Character[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}
export function CharacterList({
  data,
  onSelect,
  selectedIds,
  onToggle,
}: Props): React.JSX.Element {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {data.map((item) => (
        <li key={item.id}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelect?.(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onSelect?.(item.id);
              }
            }}
            className="cursor-pointer h-full"
          >
            <CharacterCard
              data={item}
              isSelected={selectedIds.includes(item.id)}
              onToggle={() => {
                onToggle(item.id);
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
