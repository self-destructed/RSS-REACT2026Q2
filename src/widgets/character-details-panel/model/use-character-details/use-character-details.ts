import { useRouter, useSearchParams } from "next/navigation";
import type { CharacterId } from "@entities/character";

interface UseCharacterDetailsReturn {
  handleViewDetails: (characterId: CharacterId) => void;
  handleSidebarClose: () => void;
}

export function useCharacterDetails(): UseCharacterDetailsReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const handleViewDetails = (characterId: CharacterId) => {
    sessionStorage.setItem("focusRestoreId", String(characterId));
    const qs = search ? `?${search}` : "";
    router.push(`/characters/details/${String(characterId)}${qs}`, {
      scroll: false,
    });
  };

  const handleSidebarClose = () => {
    const qs = search ? `?${search}` : "";
    router.push(`/characters${qs}`, { scroll: false });
  };

  return {
    handleViewDetails,
    handleSidebarClose,
  };
}
