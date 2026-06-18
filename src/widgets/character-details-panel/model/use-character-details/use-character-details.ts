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
    const qs = search ? `?${search}` : "";
    router.push(`/characters/details/${String(characterId)}${qs}`);
  };

  const handleSidebarClose = () => {
    const qs = search ? `?${search}` : "";
    router.push(`/characters${qs}`);
  };

  return {
    handleViewDetails,
    handleSidebarClose,
  };
}
