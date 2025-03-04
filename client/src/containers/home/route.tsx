import { lazy } from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = lazy(() => import('@containers/custom-route-container'));
const HomeContainer = lazy(() => import('./views/home-container'));

export const homePaths = {
  home: '/',
};

export const homeRoutes = [
  <Route
    key={homePaths.home}
    path={homePaths.home}
    element={
      <CustomRoute pageRequiredAuth>
        <HomeContainer />
      </CustomRoute>
    }
  />,
];
