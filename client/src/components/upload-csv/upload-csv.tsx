import { Badge, Box, Button, Grid, Group, Paper, Text, rem } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { createStyles } from '@mantine/styles';
import {
  IconCloudUpload,
  IconDownload,
  IconFileSpreadsheet,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { getFileSizeInKB, removeCsvExtension } from '@utils';
import React, { useCallback, useRef, useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.xs,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
  step: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
  stepTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 700,
    fontSize: theme.fontSizes.lg,
    marginBottom: theme.spacing.xs,
  },
  downloadLink: {
    color: theme.fn.primaryColor(),
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  fileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[3]}`,
    backgroundColor: theme.white,
    boxShadow: theme.shadows.sm,
    maxWidth: 300,
  },
  iconFile: {
    color: theme.colors.blue[6],
    flexShrink: 0,
  },
  text: {
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
  },
  size: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
  },
  badge: {
    backgroundColor: theme.colors.blue[1],
    color: theme.colors.blue[6],
    fontWeight: 500,
  },
  deleteButton: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: theme.colors.red[1],
      color: theme.colors.red[7],
    },
  },
}));

export type ExampleFile = {
  name: string;
  url: string;
};

type UploadCsvProps = {
  onUpload: (files: File[]) => void;
  exampleFile: ExampleFile;
  fileErrorMessage?: string;
};

const UploadCsv: React.FC<UploadCsvProps> = ({ exampleFile, onUpload, fileErrorMessage }) => {
  const { classes, theme } = useStyles();
  const dropZoneRef = useRef<() => void>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onUpload(acceptedFiles);
    },
    [onUpload],
  );

  const clearFiles = useCallback(() => {
    setFiles([]);
    onUpload([]);
  }, [onUpload]);

  return (
    <Box className={classes.wrapper}>
      <Grid gutter="md">
        <Grid.Col>
          <Paper className={classes.step} withBorder>
            <Text className={classes.stepTitle}>Step 1</Text>
            <Text>
              Download the template here:{' '}
              <a
                href={exampleFile.url}
                download={exampleFile.name}
                className={classes.downloadLink}
              >
                {exampleFile.name}
              </a>
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col>
          <Paper className={classes.step} withBorder>
            <Text className={classes.stepTitle}>Step 2</Text>
            <Text>Adjust the template to your needs and save it.</Text>
          </Paper>
        </Grid.Col>
        <Grid.Col>
          <Paper className={classes.step} withBorder>
            <Text className={classes.stepTitle}>Step 3</Text>
            <Text mb="xs">Upload your keyword file</Text>
            <Dropzone
              onDrop={handleDrop}
              mah={rem(150)}
              accept={{
                'text/csv': [],
              }}
              maxFiles={1}
              maxSize={1048576} // 1MB
              className={classes.dropzone}
              openRef={dropZoneRef}
            >
              <Group justify="center" p="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <IconDownload
                    size={50}
                    stroke={1.5}
                    color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size={50}
                    stroke={1.5}
                    color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload size={50} stroke={1.5} className={classes.icon} />
                </Dropzone.Idle>

                {files.length > 0 ? (
                  files.map((item, index) => (
                    <div key={index.toString()}>
                      <div className={classes.fileContainer}>
                        <IconFileSpreadsheet size={32} className={classes.iconFile} />
                        <div>
                          <Text className={classes.text}>{removeCsvExtension(item.name)}</Text>
                          <Text className={classes.size}>{getFileSizeInKB(item.size)}</Text>
                        </div>
                        <Badge className={classes.badge}>.csv</Badge>
                      </div>
                      {fileErrorMessage && (
                        <div key={fileErrorMessage}>
                          <Text>{fileErrorMessage}</Text>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div>
                    <Text size="xl" inline>
                      Drag & drop the file here or click to select
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                      Only CSV files (.csv) are accepted, up to 1MB in size
                    </Text>
                  </div>
                )}
              </Group>
            </Dropzone>

            <Group mt="md" justify="center">
              {files.length > 0 ? (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFiles();
                  }}
                  className={classes.deleteButton}
                  size="md"
                  color="red"
                  variant="subtle"
                  rightSection={<IconTrash size={16} />}
                >
                  Remove file
                </Button>
              ) : (
                dropZoneRef && <Button onClick={() => dropZoneRef.current?.()}>Select files</Button>
              )}
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default UploadCsv;
