import { httpService } from '@services';
import { newCancelToken } from '@utils';
import { SignUpPayload } from './sign-up.types';

const signUp = (payload: SignUpPayload) => {
  return httpService.post(`api-svc/v1/sign-up`, payload, newCancelToken());
};

export { signUp };
