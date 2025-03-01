const downloadFile = (url: string, name: string, isViewOnly = false) => {
  if (!url) return null;

  const element = document.createElement('a');

  element.href = url;
  element.target = '_blank';

  if (!isViewOnly) {
    element.rel = 'noopener noreferrer';
    element.setAttribute('download', name);
  }

  document.body.appendChild(element);
  element.click();

  return element.parentNode?.removeChild(element);
};

const useDownloadFile = () => {
  const download = (url: string, name = '', isViewOnly = false) => {
    downloadFile(url, name, isViewOnly);
  };

  return download;
};

export default useDownloadFile;
