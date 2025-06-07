import type { ICommunityRepository, AddPlaceDTO } from '../../domain/repositories/ICommunityRepository';
import { communityRepository } from '../../infrastructure/repositories/communityRepository';

class CommunityService {
  constructor(private readonly repository: ICommunityRepository) {}

  public getPlaces(species?: string) {
    return this.repository.getPlaces(species);
  }

  public getPlaceById(id: string) {
    return this.repository.getPlaceById(id);
  }

  public addPlace(data: AddPlaceDTO) {
    return this.repository.addPlace(data);
  }
}

export const communityService = new CommunityService(communityRepository); 