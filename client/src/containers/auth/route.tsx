import CustomRoute from '@containers/custom-route-container';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const SignIn = lazy(() => import('./views/sign-in'));
const SignUp = lazy(() => import('./views/sign-up'));

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
