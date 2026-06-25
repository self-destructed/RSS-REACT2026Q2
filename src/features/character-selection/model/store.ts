import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import type { CharacterId } from "@entities/character";

interface SelectedCharactersState {
  selectedIds: CharacterId[];
}

interface SelectedCharactersActions {
  toggle: (id: CharacterId) => void;
  unselectAll: () => void;
}

interface SelectedCharactersStore
  extends SelectedCharactersState, SelectedCharactersActions {}

export const useSelectedCharactersStore = create<SelectedCharactersStore>()(
  devtools(
    persist(
      (set) => ({
        selectedIds: [],
        toggle: (id) => {
          set(
            (state) => ({
              selectedIds: state.selectedIds.includes(id)
                ? state.selectedIds.filter((i) => i !== id)
                : [...state.selectedIds, id],
            }),
            false,
            "toggle",
          );
        },
        unselectAll: () => {
          set({ selectedIds: [] }, false, "unselectAll");
        },
      }),
      {
        name: "selected-characters",
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: "selected-characters" },
  ),
);

export function useSelectedIds(): CharacterId[] {
  return useSelectedCharactersStore((s) => s.selectedIds);
}

export function useToggleCharacter(): (id: CharacterId) => void {
  return useSelectedCharactersStore((s) => s.toggle);
}

export function useUnselectAllCharacters(): () => void {
  return useSelectedCharactersStore((s) => s.unselectAll);
}
