import { useTranslation } from 'react-i18next';

export const useMainLayoutPresenter = () => {
  const { t } = useTranslation();

  return {
    appTitle: t('app_title'),
    logoutButtonText: t('auth.logout_button'),
    loginButtonText: t('auth.login_page_title'),
  };
}; 