import { create } from 'zustand';
import type { PetType } from '../../features/community/domain/types';

// Tymczasowa definicja - do przeniesienia do features/users/domain/entities
export interface Pet {
  id: string;
  name: string;
  species: PetType;
}

interface PetState {
  activePet: Pet | null;
  setActivePet: (pet: Pet | null) => void;
  selectedPetType: PetType;
  setSelectedPetType: (petType: PetType) => void;
}

export const usePetStore = create<PetState>((set) => ({
  activePet: null,
  setActivePet: (pet) => set({ activePet: pet }),
  selectedPetType: 'dog',
  setSelectedPetType: (petType) => set({ selectedPetType: petType }),
})); 