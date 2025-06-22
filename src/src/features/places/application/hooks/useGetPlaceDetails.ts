import { useQuery } from '@tanstack/react-query';
import { placeApi } from '../../infrastructure/api/placeApi';

const placeKeys = {
  all: ['places'] as const,
  lists: () => [...placeKeys.all, 'list'] as const,
  list: (filters: string) => [...placeKeys.lists(), { filters }] as const,
  details: () => [...placeKeys.all, 'detail'] as const,
  detail: (id: string) => [...placeKeys.details(), id] as const,
};

export const useGetPlaceDetails = (id: string) => {
  return useQuery({
    queryKey: placeKeys.detail(id),
    queryFn: () => placeApi.fetchPlaceById(id),
    enabled: !!id, // The query will not run until the id is provided
  });
}; 