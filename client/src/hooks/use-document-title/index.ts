import { useLayoutEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
};

export default useDocumentTitle;
