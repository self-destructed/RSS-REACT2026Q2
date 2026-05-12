import CharacterCard from './CharacterCard';
import type { Character } from '../../../shared/api/types';

interface Props {
  data: Character[];
}
export default function CharacterList({ data }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {data.map((item) => (
        <li key={item.id}>
          <CharacterCard data={item} />
        </li>
      ))}
    </ul>
  );
}
