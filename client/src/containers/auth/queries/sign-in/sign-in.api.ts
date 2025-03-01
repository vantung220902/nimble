import { httpService } from '@services';
import { newCancelToken } from '@utils';
import { SignInPayload } from './sign-in.types';

const signIn = (payload: SignInPayload) => {
  return httpService.post(`api-svc/v1/sign-in`, payload, newCancelToken());
};

export { signIn };
