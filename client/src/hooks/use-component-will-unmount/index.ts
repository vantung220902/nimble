import { useEffect } from 'react';

const useComponentWillUnmount = (onUnmountHandler: Callback) => {
  useEffect(
    () => () => {
      onUnmountHandler();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useComponentWillUnmount;
