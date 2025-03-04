import { Navbar } from '@components';
import { Sidebar } from '@components/sidebar/sidebar';
import { AppShell, rem, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createStyles } from '@mantine/styles';
import { FC, PropsWithChildren, useState } from 'react';
import { ScreenSize, useResponsive } from 'src/hooks';

type Props = PropsWithChildren & {};

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: `${theme.colors.blue[9]} !important`,
    color: theme.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    alignSelf: 'center',
  },
  searchInput: {
    width: rem(342),
    input: {
      backgroundColor: theme.colors.blue[9],
      color: theme.white,
      '::placeholder': {
        color: theme.white,
        opacity: 1,
      },
    },
  },
}));

const SidebarHeaderLayout: FC<Props> = ({ children, ...props }) => {
  const [opened, { toggle }] = useDisclosure();
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const isMobileScreen = useResponsive(ScreenSize.MOBILE);
  const { classes } = useStyles();

  return (
    <AppShell
      header={{ height: 64, offset: true }}
      navbar={{ width: sidebarWidth, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <Sidebar setWidth={setSidebarWidth} />
      <Navbar opened={opened} toggle={toggle} />

      <AppShell.Header className={classes.header}>
        <Title order={3} className={classes.title} ta="left" mt="md" mb={24} />

        <TextInput placeholder="Search all..." classNames={{ root: classes.searchInput }} />
      </AppShell.Header>

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
