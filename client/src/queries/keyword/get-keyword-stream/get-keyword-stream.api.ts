import { appEnv } from '@config/env';

const getKeywordStream = (params: { id: string }) => {
  const baseUrl = appEnv.API_URL;
  return new EventSource(`${baseUrl}/api-svc/v1/search-keywords/keyword-stream/${params.id}`);
};

export const KeywordStreamApi = {
  getKeywordStream,
};
