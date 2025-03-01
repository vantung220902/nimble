import { httpService } from '@services';
import { newCancelToken } from '@utils';
import { VerifyPayload } from './verify.types';

const verify = (payload: VerifyPayload) => {
  return httpService.post(`api-svc/v1/verify`, payload, newCancelToken());
};

export { verify };
