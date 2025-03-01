import React from 'react';

const useKeypress = (key: string, action: Callback) => {
  React.useEffect(() => {
    function onKeyup(e: any) {
      if (e.key === key) action();
    }

    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [key, action]);
};

export default useKeypress;
