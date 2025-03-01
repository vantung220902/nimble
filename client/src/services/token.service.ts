import appConstant from '@config/constant';
import { SignInResponse } from '@queries';
import { deleteCookie, getCookie, setCookie } from '@utils/cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';

const ACCESS_TOKEN = 'accessToken';
const DEFAULT_EXPIRATION_TIME = 0.125;
const MILLISECOND_UNIT = 1000;

const clearToken = () => {
  deleteCookie(ACCESS_TOKEN);
};

const convertToDay = (millisecond: number) => {
  return Number((millisecond / (appConstant.ONE_HOUR * 24)).toFixed(2));
};

const getToken = () => {
  const accessToken = getCookie(ACCESS_TOKEN);
  return { accessToken };
};

const setToken = ({ accessToken }: SignInResponse) => {
  const decode = jwtDecode<JwtPayload>(accessToken);
  let expires;

  if (decode.exp) {
    expires = convertToDay(decode.exp * MILLISECOND_UNIT - Date.now());
  } else {
    expires = DEFAULT_EXPIRATION_TIME;
  }

  setCookie(ACCESS_TOKEN, accessToken, expires);
};

export default {
  clearToken,
  getToken,
  setToken,
};
