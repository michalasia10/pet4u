import { useMutation, useQueryClient } from '@tanstack/react-query';
import { communityService } from '../services/CommunityService';
import type { AddPlaceDTO } from '../../domain/repositories/ICommunityRepository';

export const useAddPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddPlaceDTO) => communityService.addPlace(data),
    onSuccess: () => {
      // Invalidate the cache for the places list to refetch the data
      queryClient.invalidateQueries({ queryKey: ['community', 'list'] });
    },
    // You can add onError for error handling
  });
}; 