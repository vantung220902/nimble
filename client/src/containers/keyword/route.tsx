import { lazy } from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = lazy(() => import('@containers/custom-route-container'));
const UploadKeywordsContainer = lazy(() => import('./view/upload-keywords-container'));
const KeywordDetailContainer = lazy(() => import('./view/keyword-detail-container'));
const KeywordListContainer = lazy(() => import('./view/keyword-list-container'));
const UploadedFilesContainer = lazy(() => import('./view/uploaded-files-container'));

export const keywordPaths = {
  uploadKeywords: '/upload-keywords',
  keywordDetail: '/keyword/:id',
  keywordList: '/keywords',
  uploadedFiles: '/uploaded-files',
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
  <Route
    key={keywordPaths.keywordList}
    path={keywordPaths.keywordList}
    element={
      <CustomRoute pageRequiredAuth>
        <KeywordListContainer />
      </CustomRoute>
    }
  />,
  <Route
    key={keywordPaths.uploadedFiles}
    path={keywordPaths.uploadedFiles}
    element={
      <CustomRoute pageRequiredAuth>
        <UploadedFilesContainer />
      </CustomRoute>
    }
  />,
];
