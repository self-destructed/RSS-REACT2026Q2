import { useQueryClient } from "@tanstack/react-query";
import {
  charactersByIdQueryOptions,
  mapCharacterToCSVObject,
  CHARACTER_CSV_COLUMNS,
} from "@entities/character";
import { downloadCSV } from "@shared/lib/csv";
import {
  useSelectedIds,
  useToggleCharacter,
  useUnselectAllCharacters,
} from "../../model/store";

interface UseCharacterSelectionReturn {
  selectedIds: number[];
  toggleSelection: (id: number) => void;
  unselectAll: () => void;
  handleDownload: () => Promise<void>;
}

export function useCharacterSelection(): UseCharacterSelectionReturn {
  const selectedIds = useSelectedIds();
  const toggleSelection = useToggleCharacter();
  const unselectAll = useUnselectAllCharacters();
  const queryClient = useQueryClient();

  const handleDownload = async () => {
    if (selectedIds.length === 0) return;

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

  return { selectedIds, toggleSelection, unselectAll, handleDownload };
}
