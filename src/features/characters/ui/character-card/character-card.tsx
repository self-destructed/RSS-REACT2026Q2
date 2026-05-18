import type { Character } from "../../../../shared/api/types";

interface Props {
  data: Character;
}

export default function CharacterCard({ data }: Props): React.JSX.Element {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Alive":
        return "bg-green-500";
      case "Dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status: string): string => {
    switch (status) {
      case "Alive":
        return "text-green-600 dark:text-green-400";
      case "Dead":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getGenderIcon = (gender: string): string => {
    switch (gender) {
      case "Female":
        return "♀";
      case "Male":
        return "♂";
      default:
        return "⚲";
    }
  };
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
            <span
              className={`h-2 w-2 rounded-full ${getStatusColor(data.status)} animate-pulse`}
            />
            <span
              className={`text-xs font-medium ${getStatusTextColor(data.status)}`}
            >
              {data.status}
            </span>
          </div>
        </div>

        <div className="mt-3 mt-auto space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-700 dark:text-slate-300">
              {getGenderIcon(data.gender)} {data.gender}
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
