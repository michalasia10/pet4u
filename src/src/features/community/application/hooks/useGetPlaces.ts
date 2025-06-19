import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { communityService } from '../services/CommunityService';
import type { PetType, PlaceCategory } from '../../domain/types';


interface UseGetPlacesProps {
  petType?: PetType;
  category?: PlaceCategory;
  searchQuery?: string;
}

export const useGetPlaces = ({ petType, category, searchQuery }: UseGetPlacesProps = {}) => {
  // Fetch all places using React Query
  const { data: places, isLoading, error } = useQuery({
    queryKey: ['community', 'places'],
    queryFn: () => communityService.getPlaces(),
  });

  // Filter places
  const filteredPlaces = useMemo(() => {
    if (!places) return [];

    let filtered = places;

    // Filter by pet type
    if (petType) {
      filtered = filtered.filter(place => place.speciesAffinity === petType);
    }

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(place => place.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        place =>
          place.name.toLowerCase().includes(query) ||
          place.description.toLowerCase().includes(query) ||
          place.address.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [places, petType, category, searchQuery]);

  return {
    places: places || [],
    filteredPlaces,
    isLoading,
    error,
  };
}; 