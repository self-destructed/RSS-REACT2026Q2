import type { Character } from "../../model";

interface CharacterDetailProps {
  character: Character;
}

export function CharacterDetail({
  character,
}: CharacterDetailProps): React.JSX.Element {
  return (
    <div className="text-surface shadow-secondary-1 block max-w-md rounded-lg bg-white dark:bg-neutral-800 dark:text-white">
      <div>
        <img
          className="mx-auto h-32 rounded-t-lg sm:h-36 md:h-40 lg:h-48"
          src={character.image}
          alt={character.name}
        />
      </div>
      <div className="p-6">
        <h2 className="mb-2 text-xl leading-tight font-medium text-neutral-800 dark:text-white">
          {character.name}
        </h2>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-400">
          {character.species} - {character.gender}
        </p>
      </div>
      <ul className="w-full">
        <li className="w-full border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
          Status: {character.status}
        </li>
        <li className="w-full border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
          Origin: {character.origin.name}
        </li>
        <li className="w-full border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
          Location: {character.location.name}
        </li>
        <li className="w-full border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
          Episodes: {character.episode.length}
        </li>
      </ul>
    </div>
  );
}
