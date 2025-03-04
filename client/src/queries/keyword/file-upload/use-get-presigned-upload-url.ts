/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FileUploadApi,
  FileUploadType,
  GetPresignedPayload,
  UploadFilePayload,
  useUploadFile,
} from '@queries';
import { ErrorService, responseWrapper } from '@services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export function useGetPresignedUploadUrl(
  options?: UseMutationOptions<any, Error, File> & {
    onUploadSuccess: (_data?: any, _variables?: UploadFilePayload, _context?: unknown) => void;
    setProgress: Callback;
  },
) {
  const { uploadFile, isLoading: isLoadingUploadFile } = useUploadFile({
    onSuccess: (data, variables, context) => {
      options.onUploadSuccess(data, variables, context);
    },
    onError: (error) => {
      ErrorService.handler(error);
    },
  });

  const {
    data: fileUrl,
    mutate: getPresignedUploadUrl,
    isPending: isLoading,
    isSuccess,
  } = useMutation<any, Error, File>({
    mutationFn: async (payload: File) => {
      const formattedPayload: GetPresignedPayload = {
        fileName: payload?.name,
        contentType: payload?.type,
        type: FileUploadType.keywords,
      };
      return responseWrapper<any>(FileUploadApi.getPresignedUploadUrl, [formattedPayload]);
    },
    onSuccess: (data, file) => {
      uploadFile({
        url: data?.url,
        fileData: file,
        setProgress: options.setProgress,
      });
    },
    ...options,
  });

  return {
    fileUrl,
    loading: isLoading || isLoadingUploadFile,
    isSuccess,
    getPresignedUploadUrl,
  };
}
