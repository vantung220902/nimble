import { useDisclosure } from '@mantine/hooks';
import { useCommonStore } from '@stores';
import { emptyFunction } from '@utils';
import { FC } from 'react';
import LoadingRenderer from './loading-renderer';

const LoadingContainer: FC = () => {
  const [visible] = useDisclosure(false);

  const { showLoadingGlobal } = useCommonStore();
  if (showLoadingGlobal) {
    return <LoadingRenderer toggle={emptyFunction} visible={true} />;
  }

  return <LoadingRenderer toggle={emptyFunction} visible={visible} />;
};

export default LoadingContainer;
