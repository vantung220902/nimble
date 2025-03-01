import { UploadFileType } from '@utils';

type BaseFilesPreviewProps = {
  files: UploadFileType[];
};

export type FilesPreviewProps = BaseFilesPreviewProps & {
  onRemoveAttachment?: (id: string, index: number) => void;
};
