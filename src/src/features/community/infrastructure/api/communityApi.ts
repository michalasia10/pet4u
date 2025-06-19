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
  new PetFriendlyPlace({
    id: '3',
    name: 'Restauracja Pod Łapą',
    address: 'ul. Ogrodowa 22, 00-003 Warszawa',
    location: { latitude: 52.2337, longitude: 21.0162 },
    category: 'restaurant',
    description: 'Restauracja przyjazna zwierzętom z dedykowanym menu dla psów i kotów. Dostępny ogródek z miskami z wodą.',
    addedBy: { userId: 'user-3', userName: 'Piotr Wiśniewski' },
    createdAt: new Date(),
    averageRating: 4.6,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'dog',
  }),
  new PetFriendlyPlace({
    id: '4',
    name: 'Weterynaryjne Centrum Warszawy',
    address: 'ul. Zdrowa 8, 00-004 Warszawa',
    location: { latitude: 52.2357, longitude: 21.0182 },
    category: 'vet',
    description: 'Nowoczesna klinika weterynaryjna z całodobową opieką. Specjalizacja w małych zwierzętach.',
    addedBy: { userId: 'user-4', userName: 'Dr Maria Kowalczyk' },
    createdAt: new Date(),
    averageRating: 4.9,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'cat',
  }),
  new PetFriendlyPlace({
    id: '5',
    name: 'PsiPiękni',
    address: 'ul. Stylowa 33, 00-005 Warszawa',
    location: { latitude: 52.2377, longitude: 21.0202 },
    category: 'grooming',
    description: 'Salon groomerski z doświadczonymi specjalistami. Strzyżenie, kąpiele i pielęgnacja.',
    addedBy: { userId: 'user-5', userName: 'Katarzyna Nowak' },
    createdAt: new Date(),
    averageRating: 4.7,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'dog',
  }),
  new PetFriendlyPlace({
    id: '6',
    name: 'Hotel Pupil',
    address: 'ul. Wakacyjna 11, 00-006 Warszawa',
    location: { latitude: 52.2397, longitude: 21.0222 },
    category: 'hotel',
    description: 'Luksusowy hotel dla zwierząt z indywidualnymi pokojami i całodobową opieką. Monitoring online.',
    addedBy: { userId: 'user-6', userName: 'Tomasz Zieliński' },
    createdAt: new Date(),
    averageRating: 4.8,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'cat',
  }),
  new PetFriendlyPlace({
    id: '7',
    name: 'ZooMarket',
    address: 'ul. Handlowa 45, 00-007 Warszawa',
    location: { latitude: 52.2417, longitude: 21.0242 },
    category: 'shop',
    description: 'Największy sklep zoologiczny w okolicy. Szeroki wybór karm, akcesoriów i zabawek.',
    addedBy: { userId: 'user-7', userName: 'Agnieszka Wójcik' },
    createdAt: new Date(),
    averageRating: 4.5,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'dog',
  }),
  new PetFriendlyPlace({
    id: '8',
    name: 'Koci Park',
    address: 'ul. Mruczna 9, 00-008 Warszawa',
    location: { latitude: 52.2437, longitude: 21.0262 },
    category: 'park',
    description: 'Specjalnie ogrodzony park dla kotów z drapaczkami i miejscami do wspinaczki.',
    addedBy: { userId: 'user-8', userName: 'Michał Lewandowski' },
    createdAt: new Date(),
    averageRating: 4.7,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'cat',
  }),
  new PetFriendlyPlace({
    id: '9',
    name: 'Psie Smaki',
    address: 'ul. Smakowita 77, 00-009 Warszawa',
    location: { latitude: 52.2457, longitude: 21.0282 },
    category: 'restaurant',
    description: 'Restauracja specjalizująca się w zdrowych posiłkach dla psów. Menu konsultowane z weterynarzami.',
    addedBy: { userId: 'user-9', userName: 'Ewa Dąbrowska' },
    createdAt: new Date(),
    averageRating: 4.6,
    photoUrl: 'https://placehold.co/600x400',
    speciesAffinity: 'dog',
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