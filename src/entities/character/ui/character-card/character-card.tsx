import type { Character } from "../../model";
import { Checkbox } from "@shared/ui";

interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  onToggleSelection?: () => void;
  onViewDetails?: () => void;
}

const STATUS_CONFIG: Record<string, { bg: string; text: string }> = {
  Alive: { bg: "bg-green-500", text: "text-green-600 dark:text-green-400" },
  Dead: { bg: "bg-red-500", text: "text-red-600 dark:text-red-400" },
};
const DEFAULT_STATUS = {
  bg: "bg-gray-500",
  text: "text-gray-600 dark:text-gray-400",
};

const GENDER_ICONS: Record<string, string> = {
  Female: "♀",
  Male: "♂",
};
const DEFAULT_ICON = "⚲";

export function CharacterCard({
  character,
  isSelected = false,
  onToggleSelection,
  onViewDetails,
}: CharacterCardProps): React.JSX.Element {
  const { bg: bgClass, text: textClass } =
    STATUS_CONFIG[character.status] ?? DEFAULT_STATUS;
  const icon = GENDER_ICONS[character.gender] ?? DEFAULT_ICON;

  return (
    <article
      id={character.id.toString()}
      className={`group relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="relative flex items-center gap-2 z-50">
            <Checkbox
              checked={isSelected}
              id={`checkbox-${String(character.id)}`}
              onChange={() => {
                onToggleSelection?.();
              }}
            />
            <label
              htmlFor={`checkbox-${String(character.id)}`}
              className="hover:cursor-pointer"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {character.name}
              </h3>
            </label>
          </div>
          <div className="ml-2 flex flex-shrink-0 items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${bgClass} animate-pulse`} />
            <span className={`text-xs font-medium ${textClass}`}>
              {character.status}
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-700 dark:text-slate-300">
              {icon} {character.gender}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400 dark:text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="line-clamp-1 text-slate-600 dark:text-slate-400">
              {character.location.name}
            </span>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            id={`details-btn-${String(character.id)}`}
            onClick={onViewDetails}
            aria-label={`View ${character.name} details`}
            className="cursor-pointer inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900 dark:hover:text-blue-300 before:absolute before:inset-0 before:w-full before:h-full before:content-['']"
          >
            View details
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
