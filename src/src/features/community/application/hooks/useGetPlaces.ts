import { useQuery } from '@tanstack/react-query';
import { communityService } from '../services/CommunityService';

export const useGetPlaces = (species?: string) => {
  return useQuery({
    queryKey: ['community', 'list', { species }],
    queryFn: () => communityService.getPlaces(species),
    enabled: !!species,
  });
}; 