import { GetKeywordParam } from '@queries';
import { httpService } from '@services';
import { newCancelToken } from '@utils';

const getKeywordById = (param: GetKeywordParam) => {
  const { id } = param;

  return httpService.get(`api-svc/v1/search-keywords/${id}`, {}, newCancelToken());
};

export const GetKeywordApi = {
  getKeywordById,
};
