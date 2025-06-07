import { useTranslation } from 'react-i18next';

export const useCommunityHeroSectionPresenter = () => {
  const { t } = useTranslation();

  return {
    title: t('community.hero.title', 'Odkrywaj miejsca dla Twojego pupila'),
    searchPlaceholder: t('community.hero.searchPlaceholder', 'Szukaj usług, miejsc, specjalistów...'),
  };
}; 