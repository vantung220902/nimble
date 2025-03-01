import { FileType, LightboxProps, useLightbox } from '@components';
import { useKeyPress } from 'src/hooks';
import { LightboxDocument } from './handlers';
import { LightboxActionProvider } from './providers/lightbox-action-provider';

const Lightbox = ({ data }: LightboxProps) => {
  const { hideLightbox } = useLightbox();
  const { onDownload, ...restData } = data;

  useKeyPress('Escape', () => {
    hideLightbox();
  });

  const getLightboxAction = () => {
    switch (data.type) {
      case FileType.CSV:
      default:
        return <Lightbox.Document open {...restData} type={data.type} />;
    }
  };

  return (
    <LightboxActionProvider onClose={hideLightbox} onDownload={onDownload}>
      {getLightboxAction()}
    </LightboxActionProvider>
  );
};

Lightbox.Document = LightboxDocument;

export default Lightbox;
