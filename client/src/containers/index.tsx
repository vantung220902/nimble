import { MainLayout } from '@layout';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes } from './auth/route';
import { homeRoutes } from './home/route';

const NotFound = React.lazy(() => import('./startup/not-found'));

const routes = [...homeRoutes, ...authRoutes];

type ContainerProps = {};

const Container: React.FC<ContainerProps> = () => {
  return (
    <MainLayout>
      <Suspense>
        <Routes>
          {...routes}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default Container;
