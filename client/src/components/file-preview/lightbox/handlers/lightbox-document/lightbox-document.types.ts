import { FileType } from '@components';

export type LightboxDocumentProps = React.HtmlHTMLAttributes<HTMLIFrameElement> & {
  url: string;
  title: string;
  open: boolean;
  type: FileType;
};
