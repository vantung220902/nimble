import { responseWrapper } from '@services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { VerifyApi, VerifyPayload } from '.';

export function useVerify(options?: UseMutationOptions<{}, Error, VerifyPayload>) {
  const {
    mutate: onVerify,
    isPending: isVerifying,
    isSuccess,
    isError,
    error,
  } = useMutation<{}, Error, VerifyPayload>({
    mutationFn: (payload: VerifyPayload) => responseWrapper(VerifyApi.verify, [payload]),
    ...options,
  });

  return {
    onVerify,
    isVerifying,
    isSuccess,
    isError,
    error,
  };
}
