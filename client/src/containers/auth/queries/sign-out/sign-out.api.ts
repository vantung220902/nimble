import { httpService } from '@services';
import { newCancelToken } from '@utils';

const signOut = () => {
  return httpService.post(`api-svc/v1/sign-out`, newCancelToken());
};

export { signOut };
