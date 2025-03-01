import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {};

const ModalProvider: FC<Props> = ({ children }) => {
  return (
    <ModalsProvider
      modalProps={{
        styles: {
          title: {
            fontWeight: 'bold',
          },
          header: {
            borderBottom: '1px solid #F8F8F9',
            paddingBottom: '12px',
            backgroundColor: 'white',
          },
          body: {
            backgroundColor: 'white',
          },
        },
      }}
    >
      {children}
    </ModalsProvider>
  );
};

export default ModalProvider;
