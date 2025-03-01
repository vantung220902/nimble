import { AppLoadingOverlay } from '@components/app-loading-overlay';
import { FileType } from '@components/file-upload';
import { Box, Image, Stack, Text, Tooltip } from '@mantine/core';
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import { GalleryPreviewProps } from '.';
import { getPreviewIcon } from '..';
import { galleryPreviewStyles } from './gallery-preview.styles';

const GalleryPreview = ({
  name,
  type,
  parsedUrl,
  onOpenFile,
  thumbnailProps,
  isLoading = false,
  showName = true,
  onRemove,
}: GalleryPreviewProps) => {
  const { thumbnailHeight, thumbnailWidth } = thumbnailProps;

  if (isLoading) {
    return (
      <Box pos="relative">
        <AppLoadingOverlay />
      </Box>
    );
  }

  return (
    <Stack
      data-name="remote-file-preview--gallery"
      sx={{
        mr: 1,
        borderRadius: 1.5,
        cursor: 'pointer',
        position: 'relative',
        width: thumbnailWidth,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={galleryPreviewStyles}>
        <Stack
          className="cmp-preview-file__container"
          onClick={onOpenFile}
          sx={{ width: thumbnailWidth, height: thumbnailHeight }}
        >
          {onRemove && (
            <i>
              <CloseIcon
                color="#fff"
                fontSize={20}
                className="cmp-preview-file__remove"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              />
            </i>
          )}
          {parsedUrl && type === FileType.IMAGE ? (
            <Image
              className="cmp-preview-file__image"
              src={parsedUrl}
              alt={name}
              style={{ height: thumbnailHeight }}
            />
          ) : (
            getPreviewIcon(type, name, thumbnailProps)
          )}
          {showName && (
            <Tooltip label={name}>
              <Stack className="file-title">
                <Text truncate="end" size={'12px'} c="white" ta="center">
                  {name}
                </Text>
              </Stack>
            </Tooltip>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default GalleryPreview;
