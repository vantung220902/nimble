import { UploadFileType } from '@utils';
import { GalleryPreviewProps } from '../components/gallery-preview';

type BaseFilePreviewProps = {
  file: UploadFileType;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
};

export type FilePreviewProps = BaseFilePreviewProps & BaseGalleryPreviewProps;

type BaseGalleryPreviewProps = Pick<GalleryPreviewProps, 'onRemove'>;
