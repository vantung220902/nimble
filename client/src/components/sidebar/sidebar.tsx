import { SidebarItem } from '@components/sidebar/links-group';
import { AppShell, Box, Button, ScrollArea } from '@mantine/core';
import {
  IconChevronLeft,
  IconChevronRight,
  IconDashboard,
  IconFileDescription,
  IconFileSearch,
} from '@tabler/icons-react';
import { FC, useEffect, useState } from 'react';
import UserButton from './user-button';

type SidebarProps = {
  setWidth: (width: number) => void;
};

export const Sidebar: FC<SidebarProps> = ({ setWidth }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('/');

  const options = [
    { label: 'Dashboard', icon: IconDashboard, link: '/' },
    { label: 'Upload Keywords', icon: IconFileSearch, link: '/upload' },
    {
      label: 'Keywords',
      icon: IconFileDescription,
      link: '/keywords',
    },
  ];

  const links = options.map((item) => (
    <SidebarItem
      {...item}
      key={item.label}
      collapsed={collapsed}
      activeLink={activeLink}
      setActiveLink={setActiveLink}
    />
  ));

  const toggleCollapse = () => setCollapsed(!collapsed);

  useEffect(() => {
    setWidth(collapsed ? 80 : 240);
  }, [collapsed, setWidth]);

  return (
    <>
      <AppShell.Navbar
        p="xs"
        pt={0}
        w={{ base: collapsed ? 80 : 240 }}
        sx={(theme) => ({
          backgroundColor: 'white',
          transition: 'width 200ms ease, min-width 200ms ease',
          border: '1px solid #E2E8F0',
        })}
      >
        <AppShell.Section grow component={ScrollArea}>
          <Box mt="md">{links}</Box>
        </AppShell.Section>

        <AppShell.Section>
          <UserButton collapsed={collapsed} />
        </AppShell.Section>

        <Button
          variant="filled"
          onClick={toggleCollapse}
          sx={(theme) => ({
            position: 'absolute',
            bottom: '100px',
            opacity: '60%',
            right: collapsed ? '-14px' : '-14px',
            zIndex: 1,
            padding: 0,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'white',
            color: theme.colors.blue[6],
            border: '1px solid #E2E8F0',
            '&:hover': {
              color: theme.colors.blue[7],
              opacity: '100%',
              backgroundColor: theme.colors.gray[0],
            },
          })}
        >
          {collapsed ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
        </Button>
      </AppShell.Navbar>
    </>
  );
};
