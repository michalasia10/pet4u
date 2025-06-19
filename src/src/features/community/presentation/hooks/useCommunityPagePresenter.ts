import { useTranslation } from 'react-i18next';
import type { PetType, PlaceCategory } from '../../domain/types';

export const useCommunityPagePresenter = () => {
  const { t } = useTranslation();

  const categories = [
    { id: 'all' as PlaceCategory, name: t('community.categories.all'), icon: '🏠' },
    { id: 'restaurant' as PlaceCategory, name: t('community.categories.restaurant'), icon: '🍽️' },
    { id: 'shop' as PlaceCategory, name: t('community.categories.shop'), icon: '🛍️' },
    { id: 'park' as PlaceCategory, name: t('community.categories.park'), icon: '🌳' },
    { id: 'hotel' as PlaceCategory, name: t('community.categories.hotel'), icon: '🏨' },
    { id: 'vet' as PlaceCategory, name: t('community.categories.vet'), icon: '🏥' },
    { id: 'grooming' as PlaceCategory, name: t('community.categories.grooming'), icon: '✂️' },
    { id: 'cafe' as PlaceCategory, name: t('community.categories.cafe'), icon: '☕' },
  ];

  return {
    hero: {
        title: t('community.hero.title'),
        subtitle: t('community.hero.subtitle'),
        searchPlaceholder: t('community.hero.searchPlaceholder'),
    },
    categories,
    results: {
        title: t('community.results.title'),
        found: (count: number) => t('community.results.found', { count }),
        noResultsTitle: t('community.results.noResultsTitle'),
        noResultsSubtitle: t('community.results.noResultsSubtitle'),
    },
    error: {
        loading: t('community.error.loading'),
    },
    petName: (petType: PetType) => petType === 'dog' ? `🐕 ${t('header.petSelector.dog')}` : `🐱 ${t('header.petSelector.cat')}`,
  };
}; 