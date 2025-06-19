import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePetStore } from "../../context/PetContext";
import { useAuthContext } from "../../context/AuthContext";
import { PetSelector } from "./PetSelector";
import { ProfileMenu } from "./ProfileMenu";

export const UserActions = () => {
  const { selectedPetType, setSelectedPetType } = usePetStore();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <PetSelector
        selectedPetType={selectedPetType}
        setSelectedPetType={setSelectedPetType}
      />
      <ProfileMenu onLogout={handleLogout} />
    </Box>
  );
}; 