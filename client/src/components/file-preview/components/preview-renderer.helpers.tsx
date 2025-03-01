import { FileType } from '@components/file-upload';
import { Stack, Text } from '@mantine/core';
import { BsFiletypeCsv as CsvIcon } from 'react-icons/bs';

const previewIcons = {
  [FileType.CSV]: <CsvIcon color="#217346" />,
};

export const calculateIconSize = (parentWidth: number, parentHeight: number, fraction: number) => {
  const minDimension = Math.min(parentWidth, parentHeight);

  const iconSize = minDimension * fraction;

  return iconSize;
};

export const getPreviewIcon = (
  type: FileType,
  name: string,
  thumbnailProps: {
    thumbnailWidth: number;
    thumbnailHeight: number;
  },
  fraction = 0.3,
) => {
  const { thumbnailWidth: width, thumbnailHeight: height } = thumbnailProps;

  const baseFontSize = 2;
  const area = width * height;
  const fontSize = Math.round((Math.sqrt(area) / baseFontSize) * fraction);
  return (
    <Stack
      justify="center"
      align="center"
      sx={{
        '& svg': {
          width: calculateIconSize(width, height, fraction),
          height: calculateIconSize(width, height, fraction),
        },
        borderRadius: '12px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* @ts-ignore */}
      {previewIcons[type] || (
        <Text
          sx={{
            fontSize: fontSize,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          .{getFileSuffix(name)}
        </Text>
      )}
    </Stack>
  );
};

const getFileSuffix = (name: string) => {
  const suffix = name.split('.').pop();

  return suffix;
};

export const LOCAL_PREVIEW_SUPPORT_TYPES = [
  FileType.IMAGE,
  FileType.VIDEO,
  FileType.PDF,
  FileType.CSV,
  FileType.TXT,
];
