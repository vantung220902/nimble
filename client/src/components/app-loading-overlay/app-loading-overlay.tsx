import { keyframes } from '@emotion/react';
import { Box, LoadingOverlay, LoadingOverlayProps, Text } from '@mantine/core';
import React from 'react';

interface AppLoadingOverlayProps extends LoadingOverlayProps {
  message?: string;
}

const pulse = keyframes({
  '0%': { opacity: 0.6 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0.6 },
});

export const AppLoadingOverlay: React.FC<AppLoadingOverlayProps> = ({
  visible,
  message = 'Loading...',
  ...props
}) => {
  return (
    <Box>
      <LoadingOverlay
        visible={visible}
        overlayProps={{ opacity: 0.8, blur: 0.4, color: '#000' }}
        loaderProps={{
          color: 'blue',
          type: 'bars',
          children: (
            <Box
              sx={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 1000,
              }}
            >
              <Text
                size="xl"
                fw={700}
                sx={(theme) => ({
                  color: theme.white,
                  textShadow: '0 0 10px rgba(0,0,0,0.5)',
                  animation: `${pulse} 1.5s ease-in-out infinite`,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                })}
              >
                {message}
              </Text>
            </Box>
          ),
        }}
        sx={{
          '.mantine-LoadingOverlay-overlay': {
            backdropFilter: 'blur(5px)',
          },
          '.mantine-LoadingOverlay-loader': {
            animation: `${pulse} 1.5s ease-in-out infinite`,
          },
        }}
        {...props}
      />
    </Box>
  );
};
