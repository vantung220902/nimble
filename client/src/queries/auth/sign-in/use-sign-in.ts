import { responseWrapper } from '@services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { SignInApi, SignInPayload, SignInResponse } from '.';

export function useSignIn(options?: UseMutationOptions<SignInResponse, Error, SignInPayload>) {
  const {
    mutate: onSignIn,
    isPending: isSubmitting,
    isSuccess,
    isError,
    error,
  } = useMutation<SignInResponse, Error, SignInPayload>({
    mutationFn: (payload: SignInPayload) => responseWrapper(SignInApi.signIn, [payload]),
    ...options,
  });

  return {
    onSignIn,
    isSubmitting,
    isSuccess,
    isError,
    error,
  };
}
