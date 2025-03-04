/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppLoadingOverlay, UploadCsv } from '@components';
import { keywordPaths } from '@containers/keyword/route';
import { getStatusClass, mapKeywordWithStream } from './helper';
import { EXAMPLE_FILE, KeywordType, ProcessingStatus, STATUS_CLASS_MAP } from './types';
import { Badge, Button, Card, Grid, Group, Loader, ScrollArea, Stack, Text } from '@mantine/core';
import {
  ListKeywordResponse,
  useGetKeywordStream,
  useGetListKeywords,
  useGetPresignedUploadUrl,
  useSearchKeywordUpload,
} from '@queries';
import { Toastify } from '@services';
import { IconRefresh } from '@tabler/icons-react';
import { trimS3ObjectUrl } from '@utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useStyles from './style';

const UploadKeywords = () => {
  const { classes } = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const connectionId = searchParams.get('connectionId');

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [processedKeywords, setProcessedKeywords] = useState<KeywordType[]>([]);
  const [fileErrorMessage, setFileErrorMessage] = useState<string>();

  const [_, setUploadProgress] = useState<number>(0);

  const { getPresignedUploadUrl, loading: isLoadingUploadFile } = useGetPresignedUploadUrl({
    onUploadSuccess: useCallback((_, variable) => {
      setProcessedKeywords([]);
      uploadFile({
        url: trimS3ObjectUrl(variable.url),
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
    setProgress: setUploadProgress,
  });

  const { uploadFile, isLoading: isLoadingUploadKeyword } = useSearchKeywordUpload({
    onSuccess: useCallback(
      (data) => {
        setFileErrorMessage('');
        setSearchParams({ connectionId: data.connectionId });
        Toastify.success(`Uploaded ${data.totalKeywords} keywords successfully!`);
      },
      [setSearchParams],
    ),
    onError: useCallback((error) => {
      Toastify.error(error.message);
      setFileErrorMessage(error.message);
    }, []),
  });

  const { keywords, isFetching, setParams, onGetListKeywords } = useGetListKeywords();
  const { data: keywordsStream } = useGetKeywordStream(connectionId);

  const isLoading = isFetching || isLoadingUploadFile || isLoadingUploadKeyword;

  const handleUpload = useCallback(
    (files: File[]) => {
      if (files.length > 0) {
        getPresignedUploadUrl(files[0]);
      }
    },
    [getPresignedUploadUrl],
  );

  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    onGetListKeywords().then(({ data: { records } }) => {
      setProcessedKeywords(
        mapKeywordWithStream(records as never as ListKeywordResponse[], keywordsStream),
      );
    });

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshing, processedKeywords]);

  const refreshButton = useMemo(
    () => (
      <Button
        variant="subtle"
        leftSection={<IconRefresh size={16} />}
        onClick={handleRefresh}
        loading={isFetching || isRefreshing}
        disabled={isRefreshing}
      >
        Refresh
      </Button>
    ),
    [handleRefresh, isFetching, isRefreshing],
  );

  useEffect(() => {
    if (connectionId) {
      setParams({
        fileUploadId: connectionId,
        take: 9999,
      });
    }
  }, [setParams, connectionId]);

  const handleNavigateToKeywordDetail = (id: string) => {
    const url = `${keywordPaths.keywordDetail.replace(':id', id)}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (keywords.length || keywordsStream) {
      setProcessedKeywords((prev) => mapKeywordWithStream(prev, keywordsStream));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords.length, keywordsStream]);

  const keywordList = useMemo(
    () =>
      processedKeywords.map((item) => (
        <div className={classes.item} key={item.content?.toLowerCase()}>
          <Group>
            <Text className={classes.content}>{item.content}</Text>
            <Badge
              variant="outline"
              className={getStatusClass(item.status, classes)}
              size="lg"
              radius="sm"
            >
              {item.status}
            </Badge>
          </Group>
          <Button
            variant="subtle"
            disabled={item.status !== ProcessingStatus.COMPLETED}
            className={classes.viewButton}
            onClick={() => handleNavigateToKeywordDetail(item.keywordId)}
          >
            View Result
          </Button>
        </div>
      )),
    [processedKeywords, classes],
  );

  return (
    <ScrollArea h="calc(100vh - 50px)">
      <Stack p="lg">
        <Grid gutter="md">
          <Grid.Col span={12}>
            <Card p="md" radius="md" withBorder maw="80%" mx="auto">
              <UploadCsv
                exampleFile={EXAMPLE_FILE}
                onUpload={handleUpload}
                fileErrorMessage={fileErrorMessage}
              />
            </Card>
          </Grid.Col>

          <AppLoadingOverlay visible={isLoading} message="Almost there..." />

          {Boolean(processedKeywords?.length) && (
            <Grid.Col span={12}>
              <Group mb="md" justify="center">
                <Text variant="text" size="lg">
                  Keywords Status
                </Text>
                {refreshButton}
              </Group>

              <Card p="md" radius="md" withBorder maw={700} mx="auto">
                {processedKeywords.length === 0 ? <Loader size="md" color="blue" /> : keywordList}
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </Stack>
    </ScrollArea>
  );
};

export default UploadKeywords;
