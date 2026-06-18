import { useFocusRestore } from "@shared/lib/hooks/client";
import { ROUTES } from "@shared/routes";
import { useLocation, useNavigate } from "react-router";

interface UseCharacterDetailsReturn {
  handleViewDetails: (characterId: number) => void;
  handleSidebarClose: () => void;
}

export function useCharacterDetails(): UseCharacterDetailsReturn {
  const navigate = useNavigate();
  const location = useLocation();
  const setFocusId = useFocusRestore(location.pathname === ROUTES.CHARACTERS);

  const handleViewDetails = (characterId: number) => {
    setFocusId(`details-btn-${String(characterId)}`);
    void navigate(
      `${ROUTES.CHARACTERS_DETAILS(String(characterId))}${location.search}`,
    );
  };

  const handleSidebarClose = () => {
    void navigate(`${ROUTES.CHARACTERS}${location.search}`);
  };

  return {
    handleViewDetails,
    handleSidebarClose,
  };
}
