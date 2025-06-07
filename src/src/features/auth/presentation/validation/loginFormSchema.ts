import * as yup from 'yup';
import { ValidationSchemaFactory } from '../../../../shared/validation/schemas';

export const loginFormSchema = yup.object().shape({
  email: ValidationSchemaFactory.email(),
  pass: ValidationSchemaFactory.password(), // Zmieniono z 'password' na 'pass', aby pasowało do formularza
}); 