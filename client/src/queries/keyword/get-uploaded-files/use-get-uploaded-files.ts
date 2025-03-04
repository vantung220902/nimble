import { UploadedFilesApi, UploadedFilesResponse } from '@queries';
import { PaginationResponseType, responseWrapper, TableParams } from '@services';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useState } from 'react';

const QUERY_KEY = {
  GET_UPLOADED_FILES: '/uploaded-files',
};

export function useGetUploadedFiles(
  options?: UseQueryOptions<PaginationResponseType<UploadedFilesResponse>, Error>,
) {
  const [params, setParams] = useState<TableParams>({});
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetUploadedFiles,
  } = useQuery<PaginationResponseType<UploadedFilesResponse>, Error>({
    queryKey: [QUERY_KEY.GET_UPLOADED_FILES, params],
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<UploadedFilesResponse>>(
        UploadedFilesApi.getUploadedFiles,
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
      queryKey: [QUERY_KEY.GET_UPLOADED_FILES],
    });

  const { records: files = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    files,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetUploadedFiles,
    setParams,
    handleInvalidateListProfile,
  };
}
