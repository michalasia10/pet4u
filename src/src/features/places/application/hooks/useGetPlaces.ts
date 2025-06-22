import { useQuery } from '@tanstack/react-query';
import { placeService } from '../services/PlaceService';
import type { PetType, PlaceCategory } from '../../domain/types';

type UseGetPlacesProps = {
  petType?: PetType;
  category?: PlaceCategory;
  searchQuery?: string;
  enabled?: boolean;
}

export const useGetPlaces = ({ petType, category, searchQuery, enabled = true }: UseGetPlacesProps = {}) => {
  // Fetch all places using React Query
  const { data: places, isLoading, error } = useQuery({
    enabled,
    queryKey: ['places', 'list'],
    queryFn: () => placeService.getPlaces(),
  });

  // Filter places based on provided criteria
  const filteredPlaces = places?.filter(place => {
    if (petType && place.speciesAffinity && place.speciesAffinity !== petType) {
      return false;
    }
    
    if (category && category !== 'all' && place.category !== category) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        place.name.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query) ||
        place.address.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return {
    places: filteredPlaces || [],
    isLoading,
    error,
  };
}; 