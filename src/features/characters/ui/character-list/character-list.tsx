import CharacterCard from '../character-card';
import type { Character } from '../../../../shared/api/types';

interface Props {
  onSelect?: (id: number) => void;
  data: Character[];
}
export default function CharacterList({ data, onSelect }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {data.map((item) => (
        <li
          key={item.id}
          onClick={() => onSelect?.(item.id)}
          className="cursor-pointer"
        >
          <CharacterCard data={item} />
        </li>
      ))}
    </ul>
  );
}
