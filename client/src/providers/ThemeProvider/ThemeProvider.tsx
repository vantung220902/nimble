import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table/styles.css';

import { LightboxProvider } from '@components';
import appTheme from '@config/theme';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {};

const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="light" />

      <MantineProvider
        theme={appTheme}
        defaultColorScheme="light"
        stylesTransform={emotionTransform}
      >
        <MantineEmotionProvider>
          <LightboxProvider>{children}</LightboxProvider>
        </MantineEmotionProvider>
      </MantineProvider>
    </>
  );
};

export default ThemeProvider;
