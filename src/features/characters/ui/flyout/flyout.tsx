import type { JSX } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  charactersByIdQueryOptions,
  mapCharacterToCSVObject,
  CHARACTER_CSV_COLUMNS,
} from "@entities/character";
import { downloadCSV } from "@shared/lib";
import { useSelectedIds, useUnselectAllCharacters } from "../../model/store";

export function Flyout(): JSX.Element | null {
  const selectedIds = useSelectedIds();
  const unselectAll = useUnselectAllCharacters();
  const queryClient = useQueryClient();

  if (selectedIds.length === 0) {
    return null;
  }

  const handleDownload = async () => {
    const selectedCharacters = await queryClient.fetchQuery(
      charactersByIdQueryOptions(selectedIds),
    );
    const rows = selectedCharacters.map(mapCharacterToCSVObject);
    downloadCSV(
      rows,
      CHARACTER_CSV_COLUMNS,
      `${String(selectedCharacters.length)}_items.csv`,
    );
  };

  return (
    <div className="sticky bottom-0 mt-2 left-0 right-0 z-50 flex w-full justify-center">
      <div className="w-full lg:max-w-4xl rounded-t-xl">
        <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-6 py-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Selected: {selectedIds.length}
          </span>
          <div className="flex gap-3 max-sm:flex-col">
            <button
              type="button"
              onClick={unselectAll}
              className="cursor-pointer rounded-md bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
              Unselect all
            </button>
            <button
              type="button"
              onClick={() => {
                void handleDownload();
              }}
              className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
