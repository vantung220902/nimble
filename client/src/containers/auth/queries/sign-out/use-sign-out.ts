import { SignOutApi } from '@containers/auth/queries/sign-out';
import { responseWrapper } from '@services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useSignOut(options?: UseMutationOptions<{}, Error, {}>) {
  const {
    mutate: onSignOut,
    isPending: isSubmitting,
    isSuccess,
    isError,
    error,
  } = useMutation<{}, Error, {}>({
    mutationFn: () => responseWrapper(SignOutApi.signOut),
    ...options,
  });

  return {
    onSignOut,
    isSubmitting,
    isSuccess,
    isError,
    error,
  };
}
