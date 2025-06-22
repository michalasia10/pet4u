import { useTranslation } from 'react-i18next';
import type { PetType, PlaceCategory } from '../../domain/types';

type Category = {
  id: PlaceCategory;
  name: string;
  icon: string;
}

type PetNameMap = Map<PetType, {
    translationKey: string;
    icon: string;
}>;

const petNameMap: PetNameMap = new Map([
    ['dog', { translationKey: 'header.petSelector.dog', icon: '🐕' }],
    ['cat', { translationKey: 'header.petSelector.cat', icon: '🐱' }],
]);

const categoryMap: Map<PlaceCategory, {
    translationKey: string;
    icon: string;
}> = new Map([
    ['all', { translationKey: 'places.categories.all', icon: '🏠' }],
    ['restaurant', { translationKey: 'places.categories.restaurant', icon: '🍽️' }],
    ['shop', { translationKey: 'places.categories.shop', icon: '🛍️' }],
    ['park', { translationKey: 'places.categories.park', icon: '🌳' }],
    ['hotel', { translationKey: 'places.categories.hotel', icon: '🏨' }],
    ['vet', { translationKey: 'places.categories.vet', icon: '🏥' }],
    ['grooming', { translationKey: 'places.categories.grooming', icon: '✂️' }],
    ['cafe', { translationKey: 'places.categories.cafe', icon: '☕' }],
]);

export const usePlacePagePresenter = () => {
  const { t } = useTranslation();

  const categories: Category[] = Array.from(categoryMap.entries()).map(([id, { translationKey, icon }]) => ({
    id,
    name: t(translationKey),
    icon,
  }));

  return {
    hero: {
        title: t('places.hero.title'),
        subtitle: t('places.hero.subtitle'),
        searchPlaceholder: t('places.hero.searchPlaceholder'),
    },
    categories,
    results: {
        title: t('places.results.title'),
        found: (count: number) => t('places.results.found', { count }),
        noResultsTitle: t('places.results.noResultsTitle'),
        noResultsSubtitle: t('places.results.noResultsSubtitle'),
    },
    error: {
        loading: t('places.error.loading'),
    },
    petName: (petType: PetType) => petNameMap.get(petType)?.icon + ' ' + t(petNameMap.get(petType)?.translationKey || ''),
  };
}; 