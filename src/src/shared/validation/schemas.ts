import * as yup from 'yup';

const email = () => 
  yup.string()
    .email('Wprowadź poprawny adres email')
    .required('Adres email jest wymagany');

const password = () => 
  yup.string()
    .min(6, 'Hasło musi mieć co najmniej 6 znaków')
    .required('Hasło jest wymagane');

export const ValidationSchemaFactory = {
  email,
  password,
}; 