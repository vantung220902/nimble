import { FileUploadApi, UploadFilePayload } from '@queries';
import { responseWrapper } from '@services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export function useUploadFile(options?: UseMutationOptions<any, Error, UploadFilePayload>) {
  const {
    data: response,
    mutate: uploadFile,
    isSuccess,
    isPending: isLoading,
  } = useMutation<any, Error, UploadFilePayload>({
    mutationFn: (payload: UploadFilePayload) => {
      return responseWrapper<any>(FileUploadApi.uploadFileWithProgress, [payload]);
    },
    ...options,
  });

  return {
    response,
    isSuccess,
    isLoading,
    uploadFile,
  };
}
