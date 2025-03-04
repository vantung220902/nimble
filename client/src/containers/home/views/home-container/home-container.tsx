import { Card, Grid, Group, ScrollArea, Stack, Text, Title } from '@mantine/core';

const Dashboard = () => {
  return (
    <ScrollArea h="calc(100vh - 60px)">
      <Stack p="xl" maw={1200} mx="auto">
        <Title order={2} mb="lg" c="blue.7">
          Welcome to Google Scraper
        </Title>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Card p="xl" radius="md" withBorder shadow="sm">
              <Text fw={700} size="lg" mb="xs">
                About
              </Text>
              <Text c="dimmed" size="sm">
                A simple tool to analyze Google search results.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Card p="xl" radius="md" withBorder shadow="sm">
              <Text fw={700} size="lg" mb="xs">
                Features
              </Text>
              <Text c="dimmed" size="sm" component="div">
                • Bulk keyword uploads via CSV
                <br />• Real-time processing status
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </ScrollArea>
  );
};

export default Dashboard;
