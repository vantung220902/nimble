import { responseWrapper } from '@services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ResendVerificationApi, ResendVerificationPayload } from '.';

export function useResendVerification(
  options?: UseMutationOptions<{}, Error, ResendVerificationPayload>,
) {
  const {
    mutate: onResendVerification,
    isPending: isSending,
    isSuccess,
    isError,
    error,
  } = useMutation<{}, Error, ResendVerificationPayload>({
    mutationFn: (payload: ResendVerificationPayload) =>
      responseWrapper(ResendVerificationApi.resendVerification, [payload]),
    ...options,
  });

  return {
    onResendVerification,
    isSending,
    isSuccess,
    isError,
    error,
  };
}
