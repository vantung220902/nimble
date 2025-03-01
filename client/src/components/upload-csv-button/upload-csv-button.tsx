import { ExampleFile } from '@components/upload-csv/upload-csv';
import { Button } from '@mantine/core';
import { FC } from 'react';
import { TbTableImport } from 'react-icons/tb';
import { useShowUploadSheetForm } from './upload-csv-button.helpers';

type Props = {
  title: string;
  exampleFile: ExampleFile;
  onUpload: () => void;
};

const UploadSheetButton: FC<Props> = ({ title, exampleFile, onUpload }) => {
  const { handleShowUploadSheetForm } = useShowUploadSheetForm();
  return (
    <Button
      variant="outline"
      leftSection={<TbTableImport size={14} />}
      onClick={() => handleShowUploadSheetForm({ title, onUpload, exampleFile })}
    >
      Upload
    </Button>
  );
};

export default UploadSheetButton;
