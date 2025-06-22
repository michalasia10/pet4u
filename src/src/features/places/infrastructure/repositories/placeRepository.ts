import type { IPlaceRepository, AddPlaceDTO } from '../../domain/repositories/IPlaceRepository';
import { placeApi } from '../api/placeApi';

export const placeRepository: IPlaceRepository = {
  getPlaces: (species) => {
    return placeApi.fetchPlaces(species);
  },

  getPlaceById: (id: string) => {
    return placeApi.fetchPlaceById(id);
  },

  addPlace: (data: AddPlaceDTO) => {
    return placeApi.createPlace(data);
  }
}; 