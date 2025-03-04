import { SignOutApi } from '@queries';
import { responseWrapper } from '@services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useSignOut(options?: UseMutationOptions<{}, Error, {}>) {
  const {
    mutate: onSignOut,
    isPending: isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<{}, Error, {}>({
    mutationFn: () => responseWrapper(SignOutApi.signOut),
    ...options,
  });

  return {
    onSignOut,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
