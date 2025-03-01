import {
  Box,
  Collapse,
  Group,
  Menu,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  collapsed?: boolean;
  active?: boolean;
  activeLink: string;
  setActiveLink: (link: string) => void;
}

export function SidebarItem({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  collapsed,
  active,
  activeLink,
  setActiveLink,
}: SidebarItemProps) {
  const navigate = useNavigate();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened);
  const [menuOpened, setMenuOpened] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname, setActiveLink]);

  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={collapsed ? 'hidden' : ''}
      sx={(theme) => ({
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: collapsed ? theme.spacing.xs : theme.spacing.xl,
        marginLeft: collapsed ? 0 : theme.spacing.xl,
        backgroundColor: activeLink === link.link ? theme.colors.blue[2] : 'transparent',
        fontSize: theme.fontSizes.xs,
        '&:hover': {
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.blue[6],
        },
        fontWeight: activeLink === link.link ? 700 : 500,
        borderRadius: theme.radius.md,
      })}
      href={link.link}
      key={link.label}
      onClick={(e) => {
        e.preventDefault();
        navigate(link.link);
      }}
    >
      {link.label}
    </Text>
  ));

  const menuItems = (hasLinks ? links : []).map((link) => (
    <Menu.Item
      key={link.label}
      onClick={() => {
        setActiveLink(link.link);
        navigate(link.link);
        setMenuOpened(false);
      }}
      sx={(theme) => ({
        color: activeLink === link.link ? theme.colors.blue[6] : theme.colors.gray[7],
        '&:hover': {
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.blue[6],
        },
      })}
    >
      {link.label}
    </Menu.Item>
  ));

  if (collapsed) {
    return (
      <Menu
        opened={hasLinks && menuOpened}
        onChange={setMenuOpened}
        position="right-start"
        offset={12}
        withArrow={false}
        transitionProps={{ transition: 'pop-bottom-right' }}
        width={220}
        shadow="md"
        styles={(theme) => ({
          dropdown: {
            padding: theme.spacing.xs,
            backgroundColor: 'white',
            border: `1px solid ${theme.colors.gray[2]}`,
          },
          item: {
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            borderRadius: theme.radius.sm,
          },
        })}
      >
        <Tooltip label={label} position="top-start" bg="white" c="cyan">
          <Menu.Target>
            <UnstyledButton
              onClick={() => {
                if (hasLinks) {
                  setMenuOpened((prev) => !prev);
                } else if (link) {
                  navigate(link);
                }
              }}
              sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                color: activeLink === link ? theme.colors.blue[6] : theme.colors.gray[7],
                backgroundColor: activeLink === link ? theme.colors.blue[2] : 'transparent',
                borderRadius: theme.radius.md,
                '&:hover': {
                  backgroundColor: theme.colors.gray[0],
                  color: theme.colors.blue[6],
                },
              })}
            >
              <Group justify="center" p={0}>
                <ThemeIcon
                  variant="light"
                  size={22}
                  sx={(theme) => ({
                    backgroundColor: active ? theme.colors.blue[2] : 'transparent',
                    color: active ? theme.colors.blue[6] : theme.black,
                  })}
                >
                  <Icon size={22} />
                </ThemeIcon>
              </Group>
            </UnstyledButton>
          </Menu.Target>
        </Tooltip>
        {hasLinks && <Menu.Dropdown>{menuItems}</Menu.Dropdown>}
      </Menu>
    );
  }

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (hasLinks) {
            setOpened((o) => !o);
          } else if (link) {
            navigate(link);
          }
        }}
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          backgroundColor: activeLink === link ? theme.colors.blue[2] : 'transparent',
          borderRadius: theme.radius.md,
          '&:hover': {
            backgroundColor: theme.colors.gray[0],
            color: theme.colors.blue[6],
          },
        })}
      >
        <Group justify="space-between" gap={0} p={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon
              variant="light"
              size={22}
              sx={(theme) => ({
                backgroundColor: 'transparent',
                color: active ? theme.colors.blue[6] : theme.black,
              })}
            >
              <Icon size={22} />
            </ThemeIcon>
            <Text
              sx={(theme) => ({
                fontSize: theme.fontSizes.xs,
                color: theme.black,
              })}
              size="sm"
              fw={activeLink === link ? 700 : 500}
              ml="md"
            >
              {label}
            </Text>
          </Box>
          {hasLinks && (
            <IconChevronRight
              size={22}
              stroke={1.5}
              style={{
                transition: 'transform 200ms ease',
                transform: opened ? 'rotate(-90deg)' : 'none',
                color: active ? 'blue' : 'gray',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}
