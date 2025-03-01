import { Box, Button, Grid, Group, Paper, Text, rem } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { createStyles } from '@mantine/styles';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import React, { useCallback } from 'react';

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
}));

export type ExampleFile = {
  name: string;
  url: string;
};

type UploadSheetFormProps = {
  onUpload: (files: File[]) => void;
  exampleFile: ExampleFile;
};

const UploadSheetForm: React.FC<UploadSheetFormProps> = ({ exampleFile, onUpload }) => {
  const { classes, theme } = useStyles();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles);
    },
    [onUpload],
  );

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

                <div>
                  <Text size="xl" inline>
                    Drag & drop the file here or click to select
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Only Excel files (.xls, .xlsx) are accepted, up to 1MB in size
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Paper>
        </Grid.Col>
      </Grid>
      <Group justify="right" mt={20}>
        <Button variant="light" color="gray" size="sm">
          Cancel
        </Button>
        <Button variant="light" color="blue" size="sm">
          Confirm
        </Button>
      </Group>
    </Box>
  );
};

export default UploadSheetForm;
