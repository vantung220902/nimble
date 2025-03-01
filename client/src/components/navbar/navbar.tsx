import { AppShell, Burger, Group } from '@mantine/core';
import { FC } from 'react';

type Props = {
  opened: boolean;
  toggle: () => void;
};

const Navbar: FC<Props> = ({ opened, toggle }) => {
  return (
    <AppShell.Header
      sx={(theme) => ({
        backgroundColor: theme.white,
        border: '1px solid #E2E8F0',
        padding: 0,
      })}
    >
      <Group
        h="100%"
        px="md"
        justify="space-between"
        sx={{
          margin: 0,
          padding: '0 1rem',
          gap: 0,
        }}
      >
        <Group align="center" gap="xs">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Navbar;
