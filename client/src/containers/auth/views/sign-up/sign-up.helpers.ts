import { SignInPayload } from '@queries';
import yup from '@services/yup';

export type SignUpFormType = SignInPayload & {
  confirmPassword: string;
  organizationName: string;
};

const initialSignUpForm: SignUpFormType = {
  email: '',
  password: '',
  confirmPassword: '',
  organizationName: '',
};

const schemaSignUpForm = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

export const SignUpFormHelper = {
  initialValues: initialSignUpForm,
  schema: schemaSignUpForm,
};
