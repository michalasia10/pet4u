import type { PetType, PlaceCategory } from '../../domain/types';
import { PetFriendlyPlace } from '../../domain/entities/PetFriendlyPlace';

interface Category {
  id: PlaceCategory;
  name: string;
  icon: string;
}

export class PlaceService {
  private static categories: Category[] = [
    { id: "all", name: "Wszystkie", icon: "🏪" },
    { id: "restaurant", name: "Restauracje", icon: "🍽️" },
    { id: "shop", name: "Sklepy", icon: "🛍️" },
    { id: "park", name: "Parki", icon: "🌳" },
    { id: "hotel", name: "Hotele", icon: "🏨" },
    { id: "vet", name: "Weterynarz", icon: "🏥" },
    { id: "grooming", name: "Pielęgnacja", icon: "✂️" },
    { id: "cafe", name: "Kawiarnie", icon: "☕" },
  ];

  public static getCategories(): Category[] {
    return this.categories;
  }

  public static filterPlaces(
    places: PetFriendlyPlace[],
    selectedPetType: PetType,
    selectedCategory: PlaceCategory,
    searchQuery: string
  ): PetFriendlyPlace[] {
    return places.filter((place) => {
      const matchesPetType = place.speciesAffinity === selectedPetType;
      const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
      const matchesSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPetType && matchesCategory && matchesSearch;
    });
  }
} 