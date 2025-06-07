import React, { useEffect } from 'react';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { usePetContext } from '../context/PetContext';
import type { Pet } from '../context/PetContext';

// Tymczasowy mock - to będzie pochodzić z hooka useGetUserPets()
const MOCKED_PETS: Pet[] = [
  { id: 'p1', name: 'Fafik', species: 'dog' },
  { id: 'p2', name: 'Mruczek', species: 'cat' },
];

export const PetSwitcher: React.FC = () => {
  const { activePet, setActivePet } = usePetContext();

  // Ustaw domyślnego zwierzaka przy pierwszym ładowaniu
  useEffect(() => {
    if (!activePet && MOCKED_PETS.length > 0) {
      setActivePet(MOCKED_PETS[0]);
    }
  }, [activePet, setActivePet]);

  const handleChange = (event: any) => {
    const petId = event.target.value;
    const selectedPet = MOCKED_PETS.find(p => p.id === petId) || null;
    setActivePet(selectedPet);
  };

  if (!activePet) {
    return null; // or a loading skeleton
  }

  return (
    <Box sx={{ minWidth: 120, ml: 2 }}>
      <FormControl size="small" variant="outlined">
        <Select
          value={activePet.id}
          onChange={handleChange}
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            },
          }}
        >
          {MOCKED_PETS.map(pet => (
            <MenuItem key={pet.id} value={pet.id}>
              {pet.name} ({pet.species})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}; 