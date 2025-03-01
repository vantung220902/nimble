import { authPaths } from '@containers/auth/route';
import { Box, Group, Stack, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { useSignOut } from '@queries';
import { Toastify, TokenService } from '@services';
import { useAuthStore } from '@stores';
import { useQueryClient } from '@tanstack/react-query';
import { startCase } from 'lodash';
import { FC } from 'react';
import { PiSignOut } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

type Props = {
  collapsed: boolean;
};

const UserButton: FC<Props> = ({ collapsed }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { onSignOut } = useSignOut();

  const { user, onSetIsAuthenticated, isAuthenticated } = useAuthStore();

  const handleSignOut = () => {
    onSignOut(
      {},
      {
        onSuccess() {
          queryClient.clear();
          TokenService.clearToken();
          onSetIsAuthenticated(false);
          navigate(authPaths.signIn);
        },
        onError(error) {
          Toastify.error(error?.message);
        },
      },
    );
  };

  if (!isAuthenticated || !user) return null;

  const userInitial = `${startCase(`${user.firstName} ${user.lastName}`)}`;

  if (collapsed) {
    return (
      <Box>
        <Stack
          p={4}
          gap={2}
          sx={(theme) => ({
            padding: theme.spacing.xs,
            borderTop: `1px solid ${theme.colors.gray[2]}`,
            marginTop: theme.spacing.sm,
          })}
        >
          {[{ icon: PiSignOut, label: 'Sign out', onClick: handleSignOut, danger: true }].map(
            ({ icon: Icon, label, onClick, danger }, index) => (
              <UnstyledButton
                key={label}
                onClick={onClick}
                sx={(theme) => ({
                  display: 'block',
                  width: '100%',
                  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                  borderRadius: theme.radius.sm,
                  color: danger ? theme.colors.red[6] : theme.black,
                  transition: 'all 150ms ease',
                  '&:hover': {
                    backgroundColor: danger ? theme.colors.red[0] : theme.colors.gray[0],
                    color: danger ? theme.colors.red[4] : theme.black,
                  },
                })}
              >
                <Group>
                  <Icon size={18} style={{ opacity: 0.7 }} />
                </Group>
              </UnstyledButton>
            ),
          )}
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,
          '&:hover': {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Group wrap="nowrap">
          <div style={{ flex: 1, minWidth: 0 }}>
            <Tooltip label={userInitial} disabled={userInitial.length <= 20}>
              <Text
                size="sm"
                fw={500}
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {userInitial}
              </Text>
            </Tooltip>
            <Tooltip label={user?.email} disabled={!user?.email || user.email.length <= 30}>
              <Text
                color="dimmed"
                size="xs"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {user?.email || 'No email available'}
              </Text>
            </Tooltip>
          </div>
        </Group>
      </Box>
      <Stack
        p={4}
        gap={2}
        sx={(theme) => ({
          padding: theme.spacing.xs,
          borderTop: `1px solid ${theme.colors.gray[2]}`,
          marginTop: theme.spacing.sm,
        })}
      >
        {[{ icon: PiSignOut, label: 'Sign out', onClick: handleSignOut, danger: true }].map(
          ({ icon: Icon, label, onClick, danger }, index) => (
            <UnstyledButton
              key={label}
              onClick={onClick}
              sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                borderRadius: theme.radius.sm,
                color: danger ? theme.colors.red[6] : theme.black,
                transition: 'all 150ms ease',
                '&:hover': {
                  backgroundColor: danger ? theme.colors.red[0] : theme.colors.gray[0],
                  color: danger ? theme.colors.red[4] : theme.black,
                },
              })}
            >
              <Group>
                <Icon size={18} style={{ opacity: 0.7 }} />
                <Text fw={500} size="xs">
                  {label}
                </Text>
              </Group>
            </UnstyledButton>
          ),
        )}
      </Stack>
    </Box>
  );
};

export default UserButton;
