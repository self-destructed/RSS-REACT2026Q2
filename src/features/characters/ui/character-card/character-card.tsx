import type { Character } from "@shared/api";

interface Props {
  data: Character;
  isSelected?: boolean;
  onToggle?: () => void;
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

export function CharacterCard({
  data,
  isSelected = false,
  onToggle,
}: Props): React.JSX.Element {
  const bgClass = STATUS_BG_STYLES[data.status] ?? DEFAULT_BG;
  const textClass = STATUS_TEXT_STYLES[data.status] ?? DEFAULT_TEXT;
  const icon = GENDER_ICONS[data.gender] ?? DEFAULT_ICON;

  return (
    <article
      id={data.id.toString()}
      className={`group h-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
            <input
              type="checkbox"
              checked={isSelected}
              id={`checkbox-${String(data.id)}`}
              onChange={() => {
                onToggle?.();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] checked:border-blue-600 checked:bg-blue-600 checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-400 dark:checked:border-blue-600 dark:checked:bg-blue-600"
            />
            <label
              htmlFor={`checkbox-${String(data.id)}`}
              className="inline-block ps-[0.15rem] hover:cursor-pointer"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {data.name}
              </h3>
            </label>
          </div>
          <div className="ml-2 flex flex-shrink-0 items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${bgClass} animate-pulse`} />
            <span className={`text-xs font-medium ${textClass}`}>
              {data.status}
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-1.5">
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
