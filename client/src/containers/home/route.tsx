import CustomRoute from '@containers/custom-route-container';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

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
