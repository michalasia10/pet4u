import type { ICommunityRepository, AddPlaceDTO } from '../../domain/repositories/ICommunityRepository';
import { PetFriendlyPlace } from '../../domain/entities/PetFriendlyPlace';
import { communityApi } from '../api/communityApi';

export const communityRepository: ICommunityRepository = {
  getPlaces: (species?: string): Promise<PetFriendlyPlace[]> => {
    return communityApi.fetchPlaces(species);
  },

  getPlaceById: (id: string): Promise<PetFriendlyPlace | null> => {
    return communityApi.fetchPlaceById(id);
  },

  addPlace: (data: AddPlaceDTO): Promise<PetFriendlyPlace> => {
    return communityApi.createPlace(data);
  },
}; 