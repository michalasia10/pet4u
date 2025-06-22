import { Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { PetType } from "../../../features/places/domain/types";

interface PetSelectorProps {
  selectedPetType: PetType;
  setSelectedPetType: (petType: PetType) => void;
}

export const PetSelector = ({ selectedPetType, setSelectedPetType }: PetSelectorProps) => {
  const { t } = useTranslation();
  return (
    <Select
      value={selectedPetType}
      onChange={(e) => setSelectedPetType(e.target.value as PetType)}
      sx={{
        width: 120,
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 3,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
        },
      }}
    >
      <MenuItem value="dog">🐕 {t('header.petSelector.dog')}</MenuItem>
      <MenuItem value="cat">🐱 {t('header.petSelector.cat')}</MenuItem>
    </Select>
  );
} 