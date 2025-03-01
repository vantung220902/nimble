import { COLOR_CODE } from '@config/color';
import { Anchor, Button, Card, Container, Group, Stack, Text } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

type Props = PropsWithChildren & {};

const CustomErrorBoundary: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      onError={(error, info) => {
        console.error('error: ', error);
        console.info('info: ', info);
      }}
      FallbackComponent={({ error, resetErrorBoundary }) => {
        const handleBackToHome = () => {
          resetErrorBoundary();
          navigate('/');
        };

        const handleTryAgain = () => {
          resetErrorBoundary();
          window.location.reload();
        };
        return (
          <Container>
            <Stack gap="md" ta="center" justify="center" align="center" mih="70vh" pt={32}>
              <Text size="32px" fw="bold">
                Unfortunately, something went wrong.
              </Text>
              <Text c="dimmed">
                Please refresh your browser. If the error continues, please contact{' '}
                <Anchor href="vantung220902@gmail.com" target="_blank">
                  our support team
                </Anchor>
                .
              </Text>
              <Card withBorder bg={COLOR_CODE.GREY_100}>
                <pre>{error?.message || error}</pre>
              </Card>
              <Group gap="md">
                <Button onClick={handleBackToHome} variant="outline">
                  Back to Home
                </Button>
                <Button onClick={handleTryAgain}>Try again</Button>
              </Group>
            </Stack>
          </Container>
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
