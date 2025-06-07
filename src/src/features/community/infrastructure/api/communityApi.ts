import { PetFriendlyPlace } from '../../domain/entities/PetFriendlyPlace';
import type { AddPlaceDTO } from '../../domain/repositories/ICommunityRepository';

// Mock data - now creating instances of the class
const MOCKED_PLACES: PetFriendlyPlace[] = [
  new PetFriendlyPlace({
    id: '1',
    name: 'Park Fafika',
    address: 'ul. Psia 1, 00-001 Warszawa',
    location: { latitude: 52.2297, longitude: 21.0122 },
    category: 'park',
    description: 'Duży, zielony park z wydzieloną strefą dla psów. Koty nie są mile widziane.',
    addedBy: { userId: 'user-1', userName: 'Jan Kowalski' },
    createdAt: new Date(),
    averageRating: 4.5,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'dog',
  }),
  new PetFriendlyPlace({
    id: '2',
    name: 'Kawiarnia "Pod Merdającym Ogonem"',
    address: 'ul. Kocia 5, 00-002 Warszawa',
    location: { latitude: 52.2317, longitude: 21.0142 },
    category: 'cafe',
    description: 'Kawiarnia specjalizująca się w kotach. Można przyjść z własnym kotem.',
    addedBy: { userId: 'user-2', userName: 'Anna Nowak' },
    createdAt: new Date(),
    averageRating: 4.8,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'cat',
  }),
];

export const communityApi = {
  fetchPlaces: async (species?: string): Promise<PetFriendlyPlace[]> => {
    console.log(`Fetching places for species: ${species}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    if (species) {
      return MOCKED_PLACES.filter(p => p.speciesAffinity === species);
    }
    return MOCKED_PLACES;
  },

  fetchPlaceById: async (id: string): Promise<PetFriendlyPlace | null> => {
    console.log(`Fetching place with id: ${id}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCKED_PLACES.find(p => p.id === id) ?? null;
  },

  createPlace: async (data: AddPlaceDTO): Promise<PetFriendlyPlace> => {
    console.log('Creating new place:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newPlace = new PetFriendlyPlace({
      id: String(Date.now()),
      ...data,
      createdAt: new Date(),
      averageRating: 0,
      addedBy: {
        userId: data.addedBy,
        userName: 'Current User', // This would come from auth state
      },
    });
    MOCKED_PLACES.push(newPlace);
    return newPlace;
  },
}; 