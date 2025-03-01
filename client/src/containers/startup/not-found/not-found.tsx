import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconHome, IconMapPinOff } from '@tabler/icons-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Container size="sm" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <Stack align="center" p="md">
        <IconMapPinOff size={64} color="var(--mantine-color-blue-6)" stroke={1.5} />
        <Title order={1} size="h2" fw={700}>
          Oops! Page Not Found
        </Title>
        <Text size="md" color="dimmed" maw={400}>
          We couldn't find the page you're looking for. It might have been removed, renamed, or
          doesn't exist.
        </Text>
        <Group justify="center" mt="md">
          <Button size="md" leftSection={<IconHome size={18} />} onClick={() => navigate('/')}>
            Homepage
          </Button>
          <Button
            size="md"
            variant="light"
            leftSection={<IconArrowLeft size={18} />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default NotFound;
