import { AppLoadingOverlay } from '@components/app-loading-overlay';
import { Box } from '@mantine/core';
import { FC } from 'react';

const SplashScreen: FC = () => {
  return (
    <Box pos="relative" mih="100vh">
      <AppLoadingOverlay visible={true} zIndex={1000} overlayProps={{ blur: 2 }} />
    </Box>
  );
};

export default SplashScreen;
