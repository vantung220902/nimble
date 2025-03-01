import { FileType } from '@components/file-upload';
import { Box } from '@mantine/core';
import cn from 'classnames';
import { useKeyPress } from 'src/hooks';
import { LightboxModal } from '../../components';
import { useLightboxAction } from '../../providers';
import { lightboxDocumentStyles } from './lightbox-document.styles';
import { LightboxDocumentProps } from './lightbox-document.types';

const lightboxDocumentPrefix = 'light-box__document';

const LightboxDocument = ({
  url,
  type,
  title,
  className,
  open = false,
  ...props
}: LightboxDocumentProps) => {
  const { onClose } = useLightboxAction();

  useKeyPress('Escape', () => {
    onClose();
  });

  return (
    <Box sx={lightboxDocumentStyles} data-name="light-box__document">
      <LightboxModal.Container open={open} hasLoader>
        <LightboxModal.Header title={title}>
          <LightboxModal.Actions />
        </LightboxModal.Header>

        <iframe
          title={`${type}-preview`}
          className={cn(className, lightboxDocumentPrefix, {
            [`${lightboxDocumentPrefix}__doc`]: type === FileType.DOCUMENT,
            [`${lightboxDocumentPrefix}__excel`]: type === FileType.SPREADSHEET,
            [`${lightboxDocumentPrefix}__ppt`]: type === FileType.PRESENTATION,
            [`${lightboxDocumentPrefix}__pdf`]: type === FileType.PDF,
            [`${lightboxDocumentPrefix}__csv`]: type === FileType.CSV,
          })}
          {...props}
          // src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
          src={`https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(url)}`}
        />
      </LightboxModal.Container>
    </Box>
  );
};

export default LightboxDocument;
