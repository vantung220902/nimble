import { ProcessingStatus } from '@containers/keyword/view/upload-keywords-container/types';
import { CodeHighlight } from '@mantine/code-highlight';
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { createStyles } from '@mantine/styles';
import { useGetKeywordDetail } from '@queries';
import { IconCalendar, IconCopy, IconEye } from '@tabler/icons-react';
import { getDateDisplay } from '@utils';
import { useCallback, useState } from 'react';
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
  previewModal: {
    height: '90vh',
    overflow: 'auto',
    padding: '0px',
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

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const clipboard = useClipboard();

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

  const htmlContent = keywordDetail?.crawledContent?.content;

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
              <Text c="dimmed">
                {getDateDisplay(keywordDetail.resolvedAt, 'MMM DD, YYYY HH:mm')}
              </Text>
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

          {Boolean(keywordDetail.crawledContent) && (
            <Grid gutter="md">
              <Grid.Col span={12}>
                <Card className={classes.statsCard} shadow="sm" p="md">
                  <Text size="lg" c="dimmed" fw={400}>
                    Total Ads
                  </Text>
                  <Title order={3}>{keywordDetail.crawledContent.totalGoogleAds ?? 0}</Title>
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
                    <Group>
                      <Button
                        leftSection={<IconCopy size={16} />}
                        variant="outline"
                        size="sm"
                        color={clipboard.copied ? 'green' : 'blue'}
                        onClick={() => clipboard.copy(htmlContent)}
                      >
                        {clipboard.copied ? 'Copied!' : 'Copy code'}
                      </Button>
                      <Button
                        leftSection={<IconEye size={16} />}
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewOpen(true)}
                      >
                        Preview
                      </Button>
                    </Group>
                  </Group>
                  <ScrollArea h={300}>
                    <CodeHighlight
                      language="html"
                      code={htmlContent}
                      sx={{
                        fontSize: '0.9rem',
                        border: '1px solid #eee',
                        lineHeight: 1.5,
                        padding: '12px',
                        tabSize: 2,
                      }}
                    />
                  </ScrollArea>
                </Card>

                <Modal
                  opened={previewOpen}
                  onClose={() => setPreviewOpen(false)}
                  title="Preview HTML code"
                  fullScreen={true}
                >
                  <Card shadow="sm" withBorder className={classes.previewModal}>
                    <iframe
                      title="HTML Preview"
                      srcDoc={htmlContent}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: 'white',
                      }}
                      sandbox="allow-same-origin allow-scripts"
                      referrerPolicy="no-referrer"
                    />
                  </Card>
                </Modal>
              </Grid.Col>
            </Grid>
          )}
        </Paper>
      </Container>
    </ScrollArea>
  );
};

export default KeywordDetail;
