import { FileType } from '@components';
import { PropsWithChildren } from 'react';

export type LightboxData = {
  type: FileType;
  title: string;
  url: string;
  srcType?: string;
  thumbnailUrl?: string;

  onDownload?: Callback;
};

export type LightboxState = LightboxData & {};

export type LightboxProviderProps = PropsWithChildren;
