import type { PlaceCategory } from '../types';

type PetFriendlyPlaceProps = {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  category: PlaceCategory;
  description: string;
  addedBy: {
    userId: string;
    userName:string;
  };
  createdAt: Date;
  averageRating: number;
  photoUrl?: string;
  speciesAffinity?: 'dog' | 'cat';
};

export class PetFriendlyPlace {
  public readonly id: string;
  public readonly name: string;
  public readonly address: string;
  public readonly location: {
    readonly latitude: number;
    readonly longitude: number;
  };
  public readonly category: PlaceCategory;
  public readonly description: string;
  public readonly addedBy: {
    readonly userId: string;
    readonly userName: string;
  };
  public readonly createdAt: Date;
  public readonly averageRating: number;
  public readonly photoUrl?: string;
  public readonly speciesAffinity?: 'dog' | 'cat';

  constructor(props: PetFriendlyPlaceProps) {
    this.id = props.id;
    this.name = props.name;
    this.address = props.address;
    this.location = props.location;
    this.category = props.category;
    this.description = props.description;
    this.addedBy = props.addedBy;
    this.createdAt = props.createdAt;
    this.averageRating = props.averageRating;
    this.photoUrl = props.photoUrl;
    this.speciesAffinity = props.speciesAffinity;
  }

  // Example of a method that would return a new instance
  public updateRating(newAverage: number): PetFriendlyPlace {
    return new PetFriendlyPlace({ ...this, averageRating: newAverage });
  }
} 