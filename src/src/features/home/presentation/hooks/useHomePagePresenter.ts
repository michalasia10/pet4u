import { useTranslation } from 'react-i18next';

export const useHomePagePresenter = () => {
  const { t } = useTranslation();

  return {
    welcomeText: t('welcome'),
    subtitleText: t('subtitle'),
    loginButtonText: t('login_button'),
    canStartText: t('can_start'),
    hiText: t('hi'),
  };
}; 