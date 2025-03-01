import { Group } from '@mantine/core';
import { getRandomId } from '@utils';
import { FilesPreviewProps } from '.';
import { FilePreview } from '..';

const FilesPreview = ({ files, ...props }: FilesPreviewProps) => {
  return (
    <Group
      data-name="files-preview"
      sx={{
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {files.map((file, index) => {
        const { id = getRandomId() } = file;
        return (
          <FilePreview
            key={id}
            file={file}
            {...(!!props?.onRemoveAttachment && {
              onRemove: () => props?.onRemoveAttachment(id, index),
            })}
            {...props}
          />
        );
      })}
    </Group>
  );
};

export default FilesPreview;
