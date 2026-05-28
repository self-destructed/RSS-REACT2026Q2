import type { JSX } from "react";

interface FlyoutProps {
  count: number;
  onUnselectAll: () => void;
  onDownload: () => Promise<void>;
}

export function Flyout({
  count,
  onUnselectAll,
  onDownload,
}: FlyoutProps): JSX.Element {
  return (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-6 py-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
        Selected: {count}
      </span>
      <div className="flex gap-3 max-sm:flex-col">
        <button
          type="button"
          onClick={onUnselectAll}
          className="cursor-pointer rounded-md bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
        >
          Unselect all
        </button>
        <button
          type="button"
          onClick={() => {
            void onDownload();
          }}
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}
