import { useMutation, useQueryClient } from '@tanstack/react-query';
import { placeService } from '../services/PlaceService';
import type { AddPlaceDTO } from '../../domain/repositories/IPlaceRepository';

export const useAddPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddPlaceDTO) => placeService.addPlace(data),
    onSuccess: () => {
      // Invalidate and refetch places after adding a new one
      queryClient.invalidateQueries({ queryKey: ['places', 'list'] });
    },
    // You can add onError for error handling
  });
}; 