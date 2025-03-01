import { LOCAL_PREVIEW_SUPPORT_TYPES, useLightbox } from '@components';
import { useEffect, useState } from 'react';
import { useDownloadFile } from 'src/hooks';
import { FilePreviewProps } from '.';
import PreviewRenderer from '../components';

const FilePreview = ({
  file: previewFile,
  thumbnailWidth = 120,
  thumbnailHeight = 108,
  ...props
}: FilePreviewProps) => {
  const [parsedUrl, setParsedUrl] = useState<string>('');
  const download = useDownloadFile();

  const { file, type } = previewFile || {};
  const { name = '' } = file || {};

  const { showLightbox } = useLightbox();

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const { result } = e.target as FileReader;

      setParsedUrl(result as string);
    };
    fileReader.readAsDataURL(file as File);
  }, [file]);

  const handleDownloadFile = () => {
    download(parsedUrl, name);
  };

  const handleOpenFile = () => {
    if (LOCAL_PREVIEW_SUPPORT_TYPES.includes(type)) {
      return showLightbox({
        title: name,
        url: parsedUrl,
        type,
        srcType: file?.type,
        onDownload: handleDownloadFile,
      });
    }

    return handleDownloadFile();
  };

  return (
    <PreviewRenderer.Gallery
      type={type}
      name={name}
      parsedUrl={parsedUrl}
      onOpenFile={handleOpenFile}
      thumbnailProps={{ thumbnailWidth, thumbnailHeight }}
      {...props}
    />
  );
};

export default FilePreview;
