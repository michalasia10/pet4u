import { PetFriendlyPlace } from './PetFriendlyPlace';
import type { PetType, PlaceCategory } from '../types';

// Replicating the props type from the base class, as it's not exported.
// In a real scenario, we would export PetFriendlyPlaceProps from its file.
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
  speciesAffinity?: PetType;
};

/**
 * Represents a single user review for a place.
 */
export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number; // Value from 1 to 5
  date: string; // For simplicity, using a string. Could be a Date object.
  comment: string;
}

/**
 * Represents a single amenity available at a place.
 */
export interface Amenity {
  name: string;
  // An icon could be added here in the future
}

/**
 * Contains contact information for a place.
 */
export interface ContactInfo {
  phone?: string;
  website?: string;
  email?: string;
}

/**
 * Defines the complete set of properties for the PlaceDetails entity.
 * It includes all base properties from PetFriendlyPlaceProps and adds new ones.
 */
export type PlaceDetailsProps = PetFriendlyPlaceProps & {
  galleryImages: string[]; // A list of URLs for the image gallery
  reviews: Review[];
  amenities: Amenity[];
  contact: ContactInfo;
  openingHours: string; // e.g., "Pon-Nie: 6:00 - 22:00"
};

/**
 * The PlaceDetails entity, representing a place with all its details.
 */
export class PlaceDetails extends PetFriendlyPlace {
  public readonly galleryImages: string[];
  public readonly reviews: Review[];
  public readonly amenities: Amenity[];
  public readonly contact: ContactInfo;
  public readonly openingHours: string;

  constructor(props: PlaceDetailsProps) {
    super(props); // Pass all props to the parent constructor
    this.galleryImages = props.galleryImages;
    this.reviews = props.reviews;
    this.amenities = props.amenities;
    this.contact = props.contact;
    this.openingHours = props.openingHours;
  }
} 