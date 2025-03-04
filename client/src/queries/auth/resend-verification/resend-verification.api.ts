import { httpService } from '@services';
import { newCancelToken } from '@utils';
import { ResendVerificationPayload } from './resend-verification.types';

const resendVerification = (payload: ResendVerificationPayload) => {
  return httpService.post(`api-svc/v1/resend-verification`, payload, newCancelToken());
};

export { resendVerification };
