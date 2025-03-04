import { ProcessingStatus } from '@containers/keyword/view/upload-keywords-container/types';
import {
  Badge,
  Card,
  Code,
  Container,
  Grid,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { useGetKeywordDetail } from '@queries';
import { IconCalendar } from '@tabler/icons-react';
import { getDateDisplay } from '@utils';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    maxWidth: 600,
    padding: theme.spacing.xl,
    backgroundColor: theme.white,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: theme.spacing.xl,
  },
  statsCard: {
    backgroundColor: theme.white,
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },
  keywordTitle: {
    color: theme.colors.blue[7],
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: theme.spacing.sm,
  },
  htmlContent: {
    backgroundColor: theme.colors.gray[0],
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[3]}`,
  },

  statusCompleted: {
    backgroundColor: `${theme.fn.rgba(theme.colors.green[6], 0.1)}!important`,
    color: `${theme.colors.green[6]}!important`,
    borderColor: `${theme.fn.rgba(theme.colors.green[6], 0.2)}!important`,
  },
  statusProcessing: {
    backgroundColor: `${theme.fn.rgba(theme.colors.yellow[6], 0.1)}!important`,
    color: `${theme.colors.yellow[6]}!important`,
    borderColor: `${theme.fn.rgba(theme.colors.yellow[6], 0.2)}!important`,
  },
  statusFail: {
    backgroundColor: `${theme.fn.rgba(theme.colors.red[6], 0.1)}!important`,
    color: `${theme.colors.red[6]}!important`,
    borderColor: `${theme.fn.rgba(theme.colors.red[6], 0.2)}!important`,
  },
  viewButton: {
    color: theme.colors.blue[6],
    fontWeight: 600,
  },
}));

const STATUS_CLASS_MAP = {
  [ProcessingStatus.COMPLETED]: 'statusCompleted',
  [ProcessingStatus.PROCESSING]: 'statusProcessing',
  [ProcessingStatus.FAILED]: 'statusFail',
};

const KeywordDetail = () => {
  const { classes } = useStyles();
  const { id } = useParams<{ id: string }>();

  const { keywordDetail, isLoading } = useGetKeywordDetail({
    params: {
      id,
    },
  });

  const getStatusClass = useCallback(
    (status: string) => {
      const state = STATUS_CLASS_MAP[status] ?? '';
      return (classes as any)[state];
    },
    [classes],
  );

  if (isLoading) return <Loader size="xl" />;

  return (
    <ScrollArea h="calc(100vh - 50px)">
      <Container size="lg" className={classes.container}>
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Title className={classes.keywordTitle}>
            Keyword Overview: "{keywordDetail.content}"
          </Title>

          <Group justify="apart" mb="xl">
            <Group>
              <IconCalendar size={18} />
              <Text c="dimmed">{getDateDisplay(keywordDetail.resolvedAt, 'MMM DD, YYYY')}</Text>
            </Group>
            <Badge
              variant="outline"
              className={getStatusClass(keywordDetail.status)}
              size="lg"
              radius="md"
            >
              {keywordDetail.status}
            </Badge>
          </Group>

          <Grid gutter="md">
            <Grid.Col span={12}>
              <Card className={classes.statsCard} shadow="sm" p="md">
                <Text size="lg" c="dimmed" fw={400}>
                  Total Ads
                </Text>
                <Title order={3}>{keywordDetail?.crawledContent.totalGoogleAds ?? 0}</Title>
              </Card>
            </Grid.Col>

            <Grid.Col span={12}>
              <Card className={classes.statsCard} shadow="sm" p="md">
                <Text size="lg" c="dimmed" fw={400}>
                  Total Links
                </Text>
                <Title order={3}>{keywordDetail?.crawledContent.totalLinks ?? 0}</Title>
              </Card>
            </Grid.Col>

            <Grid.Col span={12}>
              <Card shadow="sm" p="lg" className={classes.htmlContent}>
                <Group justify="apart" mb="md">
                  <Title order={4}>HTML Content</Title>
                </Group>
                <ScrollArea h={300}>
                  <Code
                    block
                    sx={{
                      fontSize: '0.9rem',
                      border: '1px solid #eee',
                    }}
                  >
                    {keywordDetail?.crawledContent.content}
                  </Code>
                </ScrollArea>
              </Card>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </ScrollArea>
  );
};

export default KeywordDetail;
