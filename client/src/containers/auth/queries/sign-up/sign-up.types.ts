import { SignInPayload, SignInResponse } from '..';

export type RegisterPayload = SignInPayload & {};

export type RegisterResponse = SignInResponse & {
  token: string;
};
