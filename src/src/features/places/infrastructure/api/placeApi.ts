import type { AddPlaceDTO } from '../../domain/repositories/IPlaceRepository';
import type { PetType } from '../../domain/types';
import { PetFriendlyPlace } from '../../domain/entities/PetFriendlyPlace';
import { PlaceDetails } from '../../domain/entities/PlaceDetails';
import type { Review, Amenity, ContactInfo } from '../../domain/entities/PlaceDetails';

// --- MOCK DETAILED DATA ---
const detailedPlaceData: PlaceDetails = new PlaceDetails({
  id: '1',
  name: 'Psi Park Centralny',
  address: 'ul. Parkowa 15, Warszawa',
  location: { latitude: 52.2297, longitude: 21.0122 },
  category: 'park',
  description: 'Przestronny park dla psów z oddzielną strefą dla małych i dużych psów. Wyposażony w przeszkody, miski na wodę i ławki dla właścicieli. Idealne miejsce na socjalizację Twojego pupila i spotkanie innych miłośników zwierząt.',
  addedBy: { userId: 'user1', userName: 'Anna Kowalska' },
  createdAt: new Date('2024-01-15'),
  averageRating: 4.8,
  photoUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400',
  speciesAffinity: 'dog',
  // Detailed properties
  galleryImages: [
    "https://psinosek.pl/wp-content/uploads/2023/09/dog-niemiecki.webp",
    "https://psinosek.pl/wp-content/uploads/2023/09/dog-niemiecki.webp",
    "https://psinosek.pl/wp-content/uploads/2023/09/dog-niemiecki.webp",
    "https://psinosek.pl/wp-content/uploads/2023/09/dog-niemiecki.webp",
  ],
  reviews: [
    {
      id: 'rev1',
      author: "Anna K.",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      rating: 5,
      date: "2 dni temu",
      comment: "Fantastyczne miejsce! Mój pies uwielbia tutaj biegać. Personel bardzo przyjazny i pomocny.",
    },
    {
      id: 'rev2',
      author: "Marcin W.",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
      rating: 4,
      date: "1 tydzień temu",
      comment: "Świetne miejsce na spacer z psem. Duży wybór akcesoriów i karmy. Polecam!",
    },
  ],
  amenities: [
      { name: "Miski na wodę" },
      { name: "Przeszkody" },
      { name: "Ogrodzenie" },
      { name: "Oświetlenie" },
      { name: "Worki na odchody" },
      { name: "Ławki" },
  ],
  contact: {
      phone: "+48 123 456 789",
      website: "www.psipark.pl",
  },
  openingHours: "Pon-Nie: 6:00 - 22:00",
});


// Mock data - same as before but now in placeApi
const mockPlaces = [
  new PetFriendlyPlace({
    id: '1',
    name: 'Psi Park Centralny',
    address: 'ul. Parkowa 15, Warszawa',
    location: { latitude: 52.2297, longitude: 21.0122 },
    category: 'park',
    description: 'Duży park z wydzielonym wybiegiem dla psów. Dostępne przeszkody agility i miska z wodą.',
    addedBy: { userId: 'user1', userName: 'Anna Kowalska' },
    createdAt: new Date('2024-01-15'),
    averageRating: 4.8,
    photoUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400',
    speciesAffinity: 'dog'
  }),
  new PetFriendlyPlace({
    id: '2', 
    name: 'Cafe Miau',
    address: 'ul. Kotowa 7, Kraków',
    location: { latitude: 50.0647, longitude: 19.9450 },
    category: 'cafe',
    description: 'Przytulna kawiarnia z kotami. Można przyjść ze swoim kotem lub po prostu podziwiać mieszkańców kawiarni.',
    addedBy: { userId: 'user2', userName: 'Piotr Nowak' },
    createdAt: new Date('2024-02-01'),
    averageRating: 4.6,
    photoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    speciesAffinity: 'cat'
  }),
  new PetFriendlyPlace({
    id: '3',
    name: 'Bistro Łapa',
    address: 'ul. Przyjazna 12, Gdańsk', 
    location: { latitude: 54.3520, longitude: 18.6466 },
    category: 'restaurant',
    description: 'Restauracja z ogródkiem, gdzie zwierzęta są mile widziane. Specjalne menu dla psów i kotów.',
    addedBy: { userId: 'user3', userName: 'Maria Wiśniewska' },
    createdAt: new Date('2024-01-20'),
    averageRating: 4.4,
    photoUrl: 'https://images.unsplash.com/photo-1552566321-4146132f0742?w=400'
  }),
  new PetFriendlyPlace({
    id: '4',
    name: 'Sklep ZooMax',
    address: 'ul. Zwierzęca 89, Poznań',
    location: { latitude: 52.4064, longitude: 16.9252 },
    category: 'shop', 
    description: 'Duży sklep zoologiczny z szerokim asortymentem. Przyjazny personel służy pomocą w wyborze produktów.',
    addedBy: { userId: 'user4', userName: 'Tomasz Kot' },
    createdAt: new Date('2024-02-10'),
    averageRating: 4.7,
    photoUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'
  }),
  new PetFriendlyPlace({
    id: '5',
    name: 'Hotel Cztery Łapy', 
    address: 'ul. Hotelowa 25, Zakopane',
    location: { latitude: 49.2992, longitude: 19.9496 },
    category: 'hotel',
    description: 'Hotel akceptujący zwierzęta. Specjalne pokoje przystosowane dla gości z pupilami.',
    addedBy: { userId: 'user5', userName: 'Katarzyna Pies' },
    createdAt: new Date('2024-01-05'),
    averageRating: 4.9,
    photoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
  }),
  new PetFriendlyPlace({
    id: '6',
    name: 'Przychodnia Weterynaryjna "Zdrowa Łapa"',
    address: 'ul. Medyczna 44, Wrocław',
    location: { latitude: 51.1079, longitude: 17.0385 },
    category: 'vet',
    description: 'Nowoczesna przychodnia weterynaryjna z pełnym zakresem usług. Przyjazna atmosfera dla zwierząt i właścicieli.',
    addedBy: { userId: 'user6', userName: 'Dr Jan Zwierzak' },
    createdAt: new Date('2024-01-30'),
    averageRating: 4.8,
    photoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
  }),
  new PetFriendlyPlace({
    id: '7',
    name: 'Salon Groomerski "Piękny Piesek"',
    address: 'ul. Pielęgnacyjna 18, Łódź',
    location: { latitude: 51.7592, longitude: 19.4560 },
    category: 'grooming',
    description: 'Profesjonalny salon groomerski. Oferujemy strzyżenia, kąpiele i kompleksową pielęgnację psów i kotów.',
    addedBy: { userId: 'user7', userName: 'Aleksandra Szczotka' },
    createdAt: new Date('2024-02-15'),
    averageRating: 4.5,
    photoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400'
  }),
  new PetFriendlyPlace({
    id: '8',
    name: 'Park Leśny z wybiegiem',
    address: 'ul. Leśna 101, Katowice', 
    location: { latitude: 50.2649, longitude: 19.0238 },
    category: 'park',
    description: 'Duży park leśny z naturalnymi ścieżkami i ogrodzonym wybiegiem dla psów. Idealne miejsce na długie spacery.',
    addedBy: { userId: 'user8', userName: 'Michał Las' },
    createdAt: new Date('2024-01-25'),
    averageRating: 4.6,
    photoUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    speciesAffinity: 'dog'
  })
];

export const placeApi = {
  fetchPlaces: async (species?: PetType): Promise<PetFriendlyPlace[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (species) {
      return mockPlaces.filter(place => 
        !place.speciesAffinity || place.speciesAffinity === species
      );
    }
    
    return mockPlaces;
  },

  fetchPlaceById: async (id: string): Promise<PetFriendlyPlace> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return the detailed mock data if the ID matches
    if (id === '1') {
      return detailedPlaceData;
    }

    const place = mockPlaces.find(p => p.id === id);
    if (!place) {
      throw new Error(`Place with id ${id} not found`);
    }
    
    return place;
  },

  createPlace: async (data: AddPlaceDTO): Promise<PetFriendlyPlace> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPlace = new PetFriendlyPlace({
      id: `generated-${Date.now()}`,
      name: data.name,
      address: data.address,
      location: {
        latitude: data.latitude,
        longitude: data.longitude
      },
      category: data.category as any,
      description: data.description,
      addedBy: {
        userId: 'current-user',
        userName: 'Current User'
      },
      createdAt: new Date(),
      averageRating: 0,
      photoUrl: data.photoUrl,
      speciesAffinity: data.speciesAffinity
    });

    mockPlaces.push(newPlace);
    return newPlace;
  }
}; 