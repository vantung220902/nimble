import { SignInPayload } from '..';

export type SignUpPayload = SignInPayload & {
  confirmPassword: string;
  firstName: string;
  lastName: string;
};
