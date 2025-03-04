import { TokenService } from '@services';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { authPaths } from './auth/route';

type CustomRouteProps = {
  pageRequiredAuth?: boolean;
};

const CustomRoute: React.FC<PropsWithChildren<CustomRouteProps>> = ({
  pageRequiredAuth = false,
  children,
}) => {
  const isAuthenticated = Boolean(TokenService.getToken().accessToken);

  if (pageRequiredAuth && !isAuthenticated) {
    return <Navigate to={authPaths.signIn} replace />;
  }

  return <>{children}</>;
};

export default CustomRoute;
