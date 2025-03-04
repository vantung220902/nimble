import appConstant from '@config/constant';
import { CancelToken } from 'apisauce';
import { isEmpty } from './validations';

export function newCancelToken(timeout = appConstant.CONNECTION_TIMEOUT) {
  const source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, timeout);

  return { cancelToken: source.token };
}

export const stringify = (
  params: { [key: string]: number | string | string[] | boolean },
  excludeKey: string[] = [],
) => {
  let result = '';

  if (!params) return '';

  Object.keys(params).forEach((key) => {
    if (!isEmpty(params[`${key}`]) || excludeKey.includes(`${key}`)) {
      if (Array.isArray(params[`${key}`])) {
        const array = params[`${key}`] as string[];
        array.forEach((param: string) => {
          result += `&${key}=${encodeURIComponent(param)}`;
        });
      } else {
        result += `&${key}=${encodeURIComponent(params[`${key}`].toString())}`;
      }
    }
  });

  result = result.replace(/^&/, '');

  return result;
};

export const trimS3ObjectUrl = (url: string) => {
  if (!url) return null;
  return url.split('?')[0];
};
