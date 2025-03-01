import { BreadcrumbsProvider } from '@components/bread-crumbs/bread-crumbs-context';
import MainAppNavigator from '@containers';
import { LoadingContainer } from '@containers/startup';
import { DayjsProvider, ModalProvider, QueryProvider, ThemeProvider } from '@providers';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as workbox from './workbox';

import '@mantine/carousel/styles.css';
import { DatesProvider } from '@mantine/dates';
import './styles/root.styles.scss';

const App = () => {
  return (
    <DatesProvider settings={{ locale: 'en' }}>
      <Suspense fallback={<LoadingContainer />}>
        <MainAppNavigator />
      </Suspense>
    </DatesProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DayjsProvider>
      <BreadcrumbsProvider>
        <QueryProvider>
          <ThemeProvider>
            <BrowserRouter>
              <ModalProvider>
                <App />
              </ModalProvider>
            </BrowserRouter>
          </ThemeProvider>
        </QueryProvider>
      </BreadcrumbsProvider>
    </DayjsProvider>
  </React.StrictMode>,
);

workbox.register();
