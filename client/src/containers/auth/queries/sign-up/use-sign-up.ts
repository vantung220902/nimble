import { responseWrapper } from '@services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { RegisterApi, RegisterPayload, RegisterResponse } from '.';

export function useSignUp(options?: UseMutationOptions<RegisterResponse, Error, RegisterPayload>) {
  const {
    mutate: onSignUp,
    isPending: isSubmitting,
    isSuccess,
    isError,
    error,
  } = useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: (payload: RegisterPayload) => responseWrapper(RegisterApi.signUp, [payload]),
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
