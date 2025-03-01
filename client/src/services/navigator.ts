import { NavigateFunction } from 'react-router-dom';

const goBack = (navigate: NavigateFunction, defaultUrl = '/') => {
  if (window.history.state && window.history.state.idx > 0) {
    navigate(-1);
  } else {
    navigate(defaultUrl, { replace: true });
  }
};

export const getNavigateUrl = (url: string) => (url.includes('http') ? url : `https://${url}`);

export default {
  goBack,
  getNavigateUrl,
};
