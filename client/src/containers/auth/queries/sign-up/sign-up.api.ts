import { httpService } from '@services';
import { newCancelToken } from '@utils';
import { RegisterPayload } from './sign-up.types';

const signUp = (payload: RegisterPayload) => {
  return httpService.post(`api-svc/v1/sign-up`, payload, newCancelToken());
};

export { signUp };
