import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";

interface SelectedCharactersState {
  selectedIds: number[];
}

interface SelectedCharactersActions {
  toggle: (id: number) => void;
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

export function useSelectedIds(): number[] {
  return useSelectedCharactersStore((s) => s.selectedIds);
}

export function useToggleCharacter(): (id: number) => void {
  return useSelectedCharactersStore((s) => s.toggle);
}

export function useUnselectAllCharacters(): () => void {
  return useSelectedCharactersStore((s) => s.unselectAll);
}
