import { Card, Grid, Group, ScrollArea, Stack, Text } from '@mantine/core';

const Dashboard = () => {
  return (
    <ScrollArea h="calc(100vh - 60px)">
      <Stack p="lg">
        <Grid gutter="md">
          <Grid.Col span={3}>
            <Card p="md" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="xs" color="dimmed">
                    Total Keywords uploads
                  </Text>
                  <Text size="xl" fw={700}>
                    Hello World!
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </ScrollArea>
  );
};

export default Dashboard;
