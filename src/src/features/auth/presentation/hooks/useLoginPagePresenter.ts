import { useTranslation } from 'react-i18next';

export const useLoginPagePresenter = () => {
  const { t } = useTranslation();

  return {
    titleText: t('auth.login_page_title'),
    forgotPasswordText: t('auth.forgot_password'),
    noAccountText: t('auth.no_account'),
    emailLabel: t('auth.form.emailLabel'),
    passwordLabel: t('auth.form.passwordLabel'),
    loginButtonText: t('auth.login'),
  };
}; 