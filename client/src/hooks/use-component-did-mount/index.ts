import { useEffect } from 'react';

const useComponentDidMount = (onMountHandler: Callback) => {
  useEffect(() => {
    onMountHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useComponentDidMount;
