import { useTranslation } from 'react-i18next';

export const useMainLayoutPresenter = () => {
  const { t } = useTranslation();

  return {
    appTitle: t('app_title'),
    logoutButtonText: t('logout_button'),
    loginButtonText: t('login_page_title'), // Reusing the key for "Zaloguj się"
  };
}; 