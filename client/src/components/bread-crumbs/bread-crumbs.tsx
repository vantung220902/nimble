import { Anchor, Box, Breadcrumbs, Text, useMantineTheme } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from './bread-crumbs-context';

export default function ModernMantineBreadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();
  const theme = useMantineTheme();

  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <Box>
      <Breadcrumbs
        sx={(theme) => ({
          padding: theme.spacing.md,
          backgroundColor: theme.white,
          borderRadius: theme.radius.sm,
          marginBottom: theme.spacing.sm,
          marginLeft: theme.spacing.md,
          marginRight: theme.spacing.md,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        })}
        separator={
          <IconChevronRight size={14} style={{ margin: '0 4px' }} color={theme.colors.gray[3]} />
        }
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {index === breadcrumbs.length - 1 ? (
              <Text
                size="sm"
                sx={{
                  color: '#495057',
                  fontWeight: 500,
                }}
              >
                {breadcrumb.label}
              </Text>
            ) : (
              <Anchor
                component={Link}
                to={breadcrumb.href}
                sx={{
                  color: '#228BE6',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#1c7ed6',
                    textDecoration: 'none',
                  },
                }}
              >
                {breadcrumb.label}
              </Anchor>
            )}
          </Box>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
