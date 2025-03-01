import { SignInPayload } from '@queries';
import yup from '@services/yup';

const initialSignInForm: SignInPayload = {
  email: '',
  password: '',
};

const schemaSignInForm = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().password().required(),
});

export const SignInFormHelper = {
  initialValues: initialSignInForm,
  schema: schemaSignInForm,
};
