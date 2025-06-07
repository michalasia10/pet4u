import { useTranslation } from 'react-i18next';

export const useLoginPagePresenter = () => {
  const { t } = useTranslation();

  return {
    titleText: t('login_page_title'),
    forgotPasswordText: t('forgot_password'),
    noAccountText: t('no_account'),
  };
}; 