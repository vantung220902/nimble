import { httpService } from '@services';
import { newCancelToken } from '@utils';

const getMyProfile = () => {
  return httpService.get(`api-svc/v1/uam/me`, {}, newCancelToken());
};

export const GetMyProfileApi = {
  getMyProfile,
};
