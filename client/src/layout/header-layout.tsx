import { AppShell } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
import { ScreenSize, useResponsive } from 'src/hooks';

type Props = PropsWithChildren & {};

const HeaderLayout: FC<Props> = ({ children, ...props }) => {
  const isMobileScreen = useResponsive(ScreenSize.MOBILE);

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Main
        styles={{
          main: {
            backgroundColor: 'white',
            ...(isMobileScreen && {
              paddingLeft: '0',
              paddingRight: '0',
            }),
            paddingTop: '108px',
          },
        }}
        {...props}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default HeaderLayout;
