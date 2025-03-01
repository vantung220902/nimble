import appConstant from '@config/constant';
import '@mantine/core/styles.css';
import { ErrorService } from '@services';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay(failureCount, error) {
        return Math.min(1000 * 2 ** failureCount, 30000);
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: appConstant.ONE_HOUR,
    },
    mutations: {
      onError(err: unknown | Error) {
        if ((err as Error).message === ErrorService.MESSAGES.forbidden) {
          return ErrorService.handler({
            message: 'You do not have permission to trigger this action.',
          });
        }
      },
      onSuccess() {},
    },
  },
});

type Props = PropsWithChildren & {};

const QueryProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" /> */}
    </QueryClientProvider>
  );
};

export default QueryProvider;
