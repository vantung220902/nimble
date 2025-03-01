import { useGetMyProfile } from '@queries';
import { TokenService } from '@services';
import { useAuthStore } from '@stores';
import { FC, useEffect } from 'react';

const AuthContainer: FC = () => {
  const { onSetUserProfile, onSetIsAuthenticated } = useAuthStore();
  const { onGetMyProfile, myProfile } = useGetMyProfile();
  const accessToken = TokenService.getToken().accessToken;

  useEffect(() => {
    if (accessToken) {
      onSetIsAuthenticated(true);
      onGetMyProfile();
    } else {
      onSetIsAuthenticated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && myProfile) {
      onSetUserProfile({
        user: myProfile,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myProfile, accessToken]);

  return null;
};

export default AuthContainer;
