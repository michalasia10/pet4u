import type { IPlaceRepository, AddPlaceDTO } from '../../domain/repositories/IPlaceRepository';
import { placeRepository } from '../../infrastructure/repositories/placeRepository';

class PlaceService {
  constructor(private readonly repository: IPlaceRepository) {}

  async getPlaces() {
    return this.repository.getPlaces();
  }

  async getPlaceById(id: string) {
    return this.repository.getPlaceById(id);
  }

  async addPlace(data: AddPlaceDTO) {
    return this.repository.addPlace(data);
  }
}

export const placeService = new PlaceService(placeRepository); 