import { GetKeywordApi, GetKeywordParam, KeywordDetail } from '@queries';
import { getResponseData, responseWrapper } from '@services';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const QUERY_KEY = {
  GET_KEYWORD_DETAIL: '/keyword',
};

type UseGetFileFormatParams = {
  params?: GetKeywordParam;
  options?: UseQueryOptions<KeywordDetail, Error, KeywordDetail>;
};

export function useGetKeywordDetail({ params, options }: UseGetFileFormatParams = {}) {
  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    refetch: onGetKeywordDetail,
  } = useQuery<KeywordDetail, Error, KeywordDetail>({
    queryKey: [QUERY_KEY.GET_KEYWORD_DETAIL, { id: params?.id }],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<KeywordDetail>(GetKeywordApi.getKeywordById, params);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    select: getResponseData,
    enabled: !!params?.id,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateGetKeywordDetail = useCallback(
    (id?: string) => {
      if (id) {
        return queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_KEYWORD_DETAIL, { uuid: id }],
        });
      }
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_KEYWORD_DETAIL],
      });
    },
    [queryClient],
  );

  const prefetchKeywordDetail = useCallback(
    (id: string) => {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.GET_KEYWORD_DETAIL, { uuid: id }],
        queryFn: (query) => {
          const [, ...params] = query.queryKey;
          return responseWrapper<KeywordDetail>(GetKeywordApi.getKeywordById, params);
        },
      });
    },
    [queryClient],
  );

  return {
    keywordDetail: data,
    isError,
    error,
    isLoading,
    onGetKeywordDetail,
    handleInvalidateGetKeywordDetail,
    prefetchKeywordDetail,
  };
}
