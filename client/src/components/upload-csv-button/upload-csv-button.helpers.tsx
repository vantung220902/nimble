import UploadSheetForm, { ExampleFile } from '@components/upload-csv/upload-csv';
import { modals } from '@mantine/modals';

type Props = {
  title: string;
  exampleFile: ExampleFile;
  onUpload: () => void;
};

export const useShowUploadSheetForm = () => {
  const handleShowUploadSheetForm = ({ title, onUpload, exampleFile }: Props) => {
    modals.closeAll();
    modals.open({
      title,
      centered: true,
      size: 'xl',
      children: (
        <UploadSheetForm
          onUpload={onUpload}
          exampleFile={{
            url: exampleFile.url,
            name: exampleFile.name,
          }}
        />
      ),
    });
    return;
  };

  return {
    handleShowUploadSheetForm,
  };
};
