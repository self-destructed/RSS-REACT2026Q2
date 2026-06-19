import {
  mapCharacterToCSVObject,
  CHARACTER_CSV_COLUMNS,
  type Character,
  type CharacterId,
} from "@entities/character";
import { getCharactersByIds } from "@entities/character/api/get-characters";
import { downloadCSV } from "@shared/lib/csv";
import {
  useSelectedIds,
  useToggleCharacter,
  useUnselectAllCharacters,
} from "../../model/store";

interface UseCharacterSelectionReturn {
  selectedIds: CharacterId[];
  toggleSelection: (id: CharacterId) => void;
  unselectAll: () => void;
  handleDownload: () => Promise<void>;
}

export function useCharacterSelection(): UseCharacterSelectionReturn {
  const selectedIds = useSelectedIds();
  const toggleSelection = useToggleCharacter();
  const unselectAll = useUnselectAllCharacters();

  const handleDownload = async () => {
    if (selectedIds.length === 0) return;

    const selectedCharacters: Character[] =
      await getCharactersByIds(selectedIds);
    const rows = selectedCharacters.map(mapCharacterToCSVObject);
    downloadCSV(
      rows,
      CHARACTER_CSV_COLUMNS,
      `${String(selectedCharacters.length)}_items.csv`,
    );
  };

  return { selectedIds, toggleSelection, unselectAll, handleDownload };
}
