import { useTranslation } from 'react-i18next';
import { getLoginFormSchema } from '../validation/loginFormSchema';

export const useUserLoginFormSchema = () => {
  const { t } = useTranslation();

  return {
    loginFormSchema: getLoginFormSchema(t),
  };
}; 