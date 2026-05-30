import type { Character } from "../../../../shared/api/types";

interface Props {
  data: Character;
}

const STATUS_BG_STYLES: Record<string, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
};
const DEFAULT_BG = "bg-gray-500";

const STATUS_TEXT_STYLES: Record<string, string> = {
  Alive: "text-green-600 dark:text-green-400",
  Dead: "text-red-600 dark:text-red-400",
};
const DEFAULT_TEXT = "text-gray-600 dark:text-gray-400";

const GENDER_ICONS: Record<string, string> = {
  Female: "♀",
  Male: "♂",
};
const DEFAULT_ICON = "⚲";

export default function CharacterCard({ data }: Props): React.JSX.Element {
  const bgClass = STATUS_BG_STYLES[data.status] ?? DEFAULT_BG;
  const textClass = STATUS_TEXT_STYLES[data.status] ?? DEFAULT_TEXT;
  const icon = GENDER_ICONS[data.gender] ?? DEFAULT_ICON;

  return (
    <article
      id={data.id.toString()}
      className="group h-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {data.name}
          </h3>
          <div className="ml-2 flex flex-shrink-0 items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${bgClass} animate-pulse`} />
            <span className={`text-xs font-medium ${textClass}`}>
              {data.status}
            </span>
          </div>
        </div>

        <div className="mt-3 mt-auto space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-700 dark:text-slate-300">
              {icon} {data.gender}
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
              {data.location.name}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
