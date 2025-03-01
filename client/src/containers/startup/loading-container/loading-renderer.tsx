import { AppLoadingOverlay } from '@components/app-loading-overlay';
import { Box } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  visible?: boolean;
  toggle?: () => void;
};

const LoadingRenderer: FC<Props> = ({ toggle, visible = true }) => {
  return (
    <Box data-id="loading-container">
      <AppLoadingOverlay visible={visible} onClick={toggle} zIndex={99999} />
    </Box>
  );
};

export default LoadingRenderer;
