import { ListKeywordResponse, ListKeywordsApi } from '@queries';
import { PaginationResponseType, responseWrapper, TableParams } from '@services';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useState } from 'react';

export function useGetListKeywords(
  options?: UseQueryOptions<PaginationResponseType<ListKeywordResponse>, Error>,
) {
  const [params, setParams] = useState<TableParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetListKeywords,
  } = useQuery<PaginationResponseType<ListKeywordResponse>, Error>({
    queryKey: ['list-keyword', params],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<ListKeywordResponse>>(
        ListKeywordsApi.getListKeywords,
        params,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateListProfile = () =>
    queryClient.invalidateQueries({
      queryKey: ['list-keyword'],
    });

  const { records: keywords = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    keywords,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetListKeywords,
    setParams,
    handleInvalidateListProfile,
  };
}
