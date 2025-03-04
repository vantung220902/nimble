import { lazy } from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = lazy(() => import('@containers/custom-route-container'));
const SignUp = lazy(() => import('./views/sign-up'));
const SignIn = lazy(() => import('./views/sign-in'));

export const authPaths = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  acceptInvite: '/accept-invite',
  onboarding: '/onboarding',
  createOrganization: '/create-organization',
};

export const authRoutes = [
  <Route
    key={authPaths.signIn}
    path={authPaths.signIn}
    element={
      <CustomRoute>
        <SignIn />
      </CustomRoute>
    }
  />,
  <Route
    key={authPaths.signUp}
    path={authPaths.signUp}
    element={
      <CustomRoute>
        <SignUp />
      </CustomRoute>
    }
  />,
];
