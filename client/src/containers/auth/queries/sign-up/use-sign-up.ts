import { responseWrapper } from '@services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { SignUpApi, SignUpPayload } from '.';

export function useSignUp(options?: UseMutationOptions<{}, Error, SignUpPayload>) {
  const {
    mutate: onSignUp,
    isPending: isSubmitting,
    isSuccess,
    isError,
    error,
  } = useMutation<{}, Error, SignUpPayload>({
    mutationFn: (payload: SignUpPayload) => responseWrapper(SignUpApi.signUp, [payload]),
    ...options,
  });

  return {
    onSignUp,
    isSubmitting,
    isSuccess,
    isError,
    error,
  };
}
