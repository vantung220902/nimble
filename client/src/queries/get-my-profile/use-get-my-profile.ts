import { GetMyProfileApi } from '@queries/get-my-profile/get-my-profile.api';
import { MyProfile } from '@queries/get-my-profile/get-my-profile.type';
import { getResponseData, responseWrapper } from '@services';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const QUERY_KEY = {
  MY_PROFILE: '/me',
};

export function useGetMyProfile(enabled = true) {
  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    refetch: onGetMyProfile,
  } = useQuery<{}, Error, MyProfile>({
    queryKey: [QUERY_KEY.MY_PROFILE],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<MyProfile>(GetMyProfileApi.getMyProfile, params);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    select: getResponseData,
    enabled,
  });

  const queryClient = useQueryClient();

  const handleInvalidateGetMyProfile = useCallback(
    (id?: string) => {
      if (id) {
        return queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_PROFILE],
        });
      }
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_PROFILE],
      });
    },
    [queryClient],
  );

  const prefetchMyProfile = useCallback(
    (id: string) => {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.MY_PROFILE, { uuid: id }],
        queryFn: (query) => {
          const [, ...params] = query.queryKey;
          return responseWrapper<MyProfile>(GetMyProfileApi.getMyProfile, params);
        },
      });
    },
    [queryClient],
  );

  return {
    myProfile: data,
    isError,
    error,
    isLoading,
    onGetMyProfile,
    handleInvalidateGetMyProfile,
    prefetchMyProfile,
  };
}
