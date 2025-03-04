import { ListKeywordParam } from '@queries';
import { httpService } from '@services';
import { newCancelToken } from '@utils';

const getListKeywords = (params: ListKeywordParam) => {
  return httpService.get(`api-svc/v1/search-keywords`, params, newCancelToken());
};

export const ListKeywordsApi = {
  getListKeywords,
};
