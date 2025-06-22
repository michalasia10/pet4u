import type { PetFriendlyPlace } from '../entities/PetFriendlyPlace';
import type { PetType } from '../types';

export type AddPlaceDTO = { name: string; description: string; category: string; address: string; latitude: number; longitude: number; speciesAffinity?: PetType; photoUrl?: string; };

export interface IPlaceRepository {
  getPlaces(species?: PetType): Promise<PetFriendlyPlace[]>;
  getPlaceById(id: string): Promise<PetFriendlyPlace>;
  addPlace(data: AddPlaceDTO): Promise<PetFriendlyPlace>;
} 