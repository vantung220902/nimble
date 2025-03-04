import { lazy } from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = lazy(() => import('@containers/custom-route-container'));
const UploadKeywordsContainer = lazy(() => import('./view/upload-keywords-container'));
const KeywordDetailContainer = lazy(() => import('./view/keyword-detail-container'));

export const keywordPaths = {
  uploadKeywords: '/upload-keywords',
  keywordDetail: '/keyword/:id',
};

export const keywordRoutes = [
  <Route
    key={keywordPaths.uploadKeywords}
    path={keywordPaths.uploadKeywords}
    element={
      <CustomRoute pageRequiredAuth>
        <UploadKeywordsContainer />
      </CustomRoute>
    }
  />,
  <Route
    key={keywordPaths.keywordDetail}
    path={keywordPaths.keywordDetail}
    element={
      <CustomRoute pageRequiredAuth>
        <KeywordDetailContainer />
      </CustomRoute>
    }
  />,
];
