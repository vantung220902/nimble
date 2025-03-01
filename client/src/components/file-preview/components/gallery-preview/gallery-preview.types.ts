import { FileType } from '@components/file-upload';

export type GalleryPreviewProps = {
  name: string;
  type: FileType;
  parsedUrl: string;
  isLoading?: boolean;
  thumbnailProps: {
    thumbnailWidth: number;
    thumbnailHeight: number;
  };
  showName?: boolean;

  onOpenFile: () => void;
  onRemove?: () => void;
};
