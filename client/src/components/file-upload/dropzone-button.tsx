import { Box, Button, Group, Loader, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { useRef } from 'react';

type DropzoneButtonProps = {
  onUpload: (files: File[]) => void;
  isUploading?: boolean;
  isSuccess?: boolean;
  isFail?: boolean;
  accept?: string[];
  maxSize?: number;
  idleText?: string;
  acceptText?: string;
  rejectText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  mini?: boolean;
};

export function DropzoneButton({
  onUpload,
  isUploading = false,
  isSuccess = false,
  isFail = false,
  accept = [MIME_TYPES.pdf],
  maxSize = 30 * 1024 ** 2,
  idleText = 'Upload your file',
  acceptText = 'Drop files here',
  rejectText = 'File format not accepted or size exceeded',
  size = 'md',
  mini = false,
}: DropzoneButtonProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  const sizeStyles = {
    xs: { padding: '10px', fontSize: '12px' },
    sm: { padding: '20px', fontSize: '14px' },
    md: { padding: '40px', fontSize: '16px' },
    lg: { padding: '60px', fontSize: '18px' },
  };

  const handleDrop = async (files: File[]) => {
    onUpload(files);
  };

  return (
    <div style={{ position: 'relative', marginBottom: '30px' }}>
      <Dropzone openRef={openRef} onDrop={handleDrop} radius="md" maxSize={maxSize}>
        {!mini ? (
          <Box
            sx={{
              border: '1px dashed #ced4da',
              padding: sizeStyles[size].padding,
              borderRadius: theme.radius.md,
              backgroundColor: theme.white,
              pointerEvents: 'none',
            }}
          >
            <Group justify="center">
              {isUploading ? (
                <Loader size={50} color={theme.colors.blue[6]} />
              ) : isFail ? (
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              ) : (
                <>
                  <Dropzone.Accept>
                    <IconDownload size={50} color={theme.colors.blue[6]} stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconCloudUpload size={50} color={theme.colors.gray[4]} stroke={1.5} />
                  </Dropzone.Idle>
                </>
              )}
            </Group>

            <Text ta="center" fw={700} size={sizeStyles[size].fontSize} mt="xl">
              {isUploading ? (
                'Uploading...'
              ) : isFail ? (
                'Upload Failed'
              ) : (
                <>
                  <Dropzone.Accept>{acceptText}</Dropzone.Accept>
                  <Dropzone.Reject>{rejectText}</Dropzone.Reject>
                  <Dropzone.Idle>{idleText}</Dropzone.Idle>
                </>
              )}
            </Text>
            {!isUploading && !isFail && (
              <>
                <Text ta="center" size="sm" mt="xs" color="dimmed">
                  Drag'n'drop files here to upload.
                </Text>
                <Text ta="center" size="sm" mt="xs" color="dimmed">
                  Accepted formats: {accept.join(', ')}.
                </Text>
                <Text ta="center" size="sm" mt="xs" color="dimmed">
                  Max size: {maxSize / 1024 ** 2}MB.
                </Text>
              </>
            )}
          </Box>
        ) : (
          <Button
            sx={{
              position: mini ? 'static' : 'absolute',
              width: mini ? 'auto' : '250px',
              left: mini ? 'auto' : 'calc(50% - 125px)',
              bottom: mini ? 'auto' : '-20px',
            }}
            size={size}
            radius="xl"
            onClick={() => {
              console.log('openRef.current?.()');
              openRef.current?.();
            }}
            variant={isFail ? 'outline' : 'default'}
            color={isFail ? 'red' : 'blue'}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : isFail ? 'Upload Failed' : 'Select files'}
          </Button>
        )}
      </Dropzone>
    </div>
  );
}
