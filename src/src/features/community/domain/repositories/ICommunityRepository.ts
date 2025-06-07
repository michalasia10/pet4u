import { PetFriendlyPlace } from '../entities/PetFriendlyPlace';

export type AddPlaceDTO = Omit<PetFriendlyPlace, 'id' | 'createdAt' | 'averageRating' | 'addedBy' | 'updateRating'> & {
  addedBy: string; // just userId
};

export interface ICommunityRepository {
  getPlaces(species?: string): Promise<PetFriendlyPlace[]>;
  getPlaceById(id: string): Promise<PetFriendlyPlace | null>;
  addPlace(data: AddPlaceDTO): Promise<PetFriendlyPlace>;
} 