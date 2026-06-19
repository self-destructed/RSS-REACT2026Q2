import { useRouter, useSearchParams } from "next/navigation";

interface UseCharacterDetailsReturn {
  handleViewDetails: (characterId: number) => void;
  handleSidebarClose: () => void;
}

export function useCharacterDetails(): UseCharacterDetailsReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";

  const handleViewDetails = (characterId: number) => {
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
