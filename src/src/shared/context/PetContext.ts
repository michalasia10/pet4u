import create from 'zustand';

// Tymczasowa definicja - do przeniesienia do features/users/domain/entities
export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
}

interface PetState {
  activePet: Pet | null;
  setActivePet: (pet: Pet | null) => void;
}

export const usePetContext = create<PetState>((set) => ({
  activePet: null,
  setActivePet: (pet) => set({ activePet: pet }),
})); 