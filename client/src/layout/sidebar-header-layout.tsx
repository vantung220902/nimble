import { Navbar } from '@components';
import { Sidebar } from '@components/sidebar/sidebar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, PropsWithChildren, useState } from 'react';
import { ScreenSize, useResponsive } from 'src/hooks';

type Props = PropsWithChildren & {};

const SidebarHeaderLayout: FC<Props> = ({ children, ...props }) => {
  const [opened, { toggle }] = useDisclosure();
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const isMobileScreen = useResponsive(ScreenSize.MOBILE);

  return (
    <AppShell
      navbar={{
        width: sidebarWidth,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <Sidebar setWidth={setSidebarWidth} />
      <Navbar opened={opened} toggle={toggle} />

      <AppShell.Main
        styles={{
          main: {
            marginTop: '70px',
            backgroundColor: '#FBFBFB',
            ...(isMobileScreen && {
              paddingLeft: '0',
              paddingRight: '0',
            }),
          },
        }}
        {...props}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default SidebarHeaderLayout;
