import { useRouter, useSearchParams } from "next/navigation";
import type { CharacterId } from "@entities/character";

interface UseCharacterDetailsReturn {
  handleViewDetails: (characterId: CharacterId) => void;
}

export function useCharacterDetails(): UseCharacterDetailsReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewDetails = (characterId: CharacterId) => {
    sessionStorage.setItem("focusRestoreId", String(characterId));
    const next = new URLSearchParams(searchParams.toString());
    next.set("details", String(characterId));

    router.push(`/characters?${next.toString()}`, {
      scroll: false,
    });
  };

  return {
    handleViewDetails,
  };
}
