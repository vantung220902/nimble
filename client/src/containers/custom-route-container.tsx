import { useAuthStore } from '@stores';
import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authRoutes } from './auth/route';

type CustomRouteProps = {
  pageRequiredAuth?: boolean;
};

const CustomRoute: React.FC<PropsWithChildren<CustomRouteProps>> = ({
  pageRequiredAuth = false,
  children,
}) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const isAuthRoute = authRoutes.some(
    (route: { props: { path: string } }) => route.props.path === location.pathname,
  );

  if (pageRequiredAuth && !isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (isAuthenticated && isAuthRoute) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default CustomRoute;
