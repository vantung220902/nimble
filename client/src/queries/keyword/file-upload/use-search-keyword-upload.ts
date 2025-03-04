import { FileUploadApi, SearchKeywordUploadPayload, SearchKeywordUploadResponse } from '@queries';
import { responseWrapper } from '@services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useSearchKeywordUpload(
  options?: UseMutationOptions<SearchKeywordUploadResponse, Error, SearchKeywordUploadPayload>,
) {
  const {
    data: response,
    mutate: uploadFile,
    isSuccess,
    isPending: isLoading,
  } = useMutation<SearchKeywordUploadResponse, Error, SearchKeywordUploadPayload>({
    mutationFn: (payload: SearchKeywordUploadPayload) => {
      return responseWrapper<SearchKeywordUploadResponse>(FileUploadApi.uploadSearchKeyword, [
        payload,
      ]);
    },
    ...options,
  });

  const parsedResponse = useMemo(() => response ?? null, [response]);

  return {
    response: parsedResponse,
    isSuccess,
    isLoading,
    uploadFile,
  };
}
