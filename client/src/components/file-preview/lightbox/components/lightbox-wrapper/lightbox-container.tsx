import { Group, Loader, Overlay, OverlayProps } from '@mantine/core';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  open?: boolean;
  LoadingOverlayProps?: OverlayProps;
  hasLoader?: boolean;
};

const LightboxContainer = ({ children, open, LoadingOverlayProps, hasLoader = false }: Props) => {
  return (
    open && (
      <Overlay
        color="#000"
        backgroundOpacity={0.85}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        {...LoadingOverlayProps}
      >
        {hasLoader && (
          <Group
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Loader size="xl" />
          </Group>
        )}
        {children}
      </Overlay>
    )
  );
};

export default LightboxContainer;
