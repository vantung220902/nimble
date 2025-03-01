import { SignInPayload } from '@queries';
import yup from '@services/yup';

export type SignUpFormType = SignInPayload & {
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const initialSignUpForm: SignUpFormType = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
};

const schemaSignUpForm = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().password().required(),
  confirmPassword: yup.string().password().required(),
  firstName: yup.string().required().max(100, 'First name must be less than 100'),
  lastName: yup.string().required().max(100, 'Last name must be less than 100'),
});

export const SignUpFormHelper = {
  initialValues: initialSignUpForm,
  schema: schemaSignUpForm,
};
