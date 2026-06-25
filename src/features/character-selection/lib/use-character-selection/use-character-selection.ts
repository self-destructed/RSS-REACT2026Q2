import { type CharacterId } from "@entities/character";
import {
  useSelectedIds,
  useToggleCharacter,
  useUnselectAllCharacters,
} from "../../model/store";

interface UseCharacterSelectionReturn {
  selectedIds: CharacterId[];
  toggleSelection: (id: CharacterId) => void;
  unselectAll: () => void;
  handleDownload: () => void;
}

export function useCharacterSelection(): UseCharacterSelectionReturn {
  const selectedIds = useSelectedIds();
  const toggleSelection = useToggleCharacter();
  const unselectAll = useUnselectAllCharacters();

  const handleDownload = () => {
    if (selectedIds.length === 0) return;
    window.open(`/api/csv/characters?ids=${selectedIds.join(",")}`, "_self");
  };

  return { selectedIds, toggleSelection, unselectAll, handleDownload };
}
