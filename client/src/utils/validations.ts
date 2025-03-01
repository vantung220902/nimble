import dayjs from 'dayjs';

type Field = 'email' | 'password' | 'text';

export const isString = (value: any): value is string => typeof value === 'string';

const isEmptyObject = (value: any): boolean =>
  typeof value === 'object' && Object.keys(value).length === 0;

const isEmptyString = (value: any): boolean => typeof value === 'string' && value === '';

const isEmptyArray = (value: any): boolean => Array.isArray(value) && value.length === 0;

const isInvalidDate = (value: any): boolean => value instanceof Date && !dayjs(value).isValid();

export const isEmpty = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    Number.isNaN(value) ||
    isInvalidDate(value) ||
    isEmptyObject(value) ||
    isEmptyString(value) ||
    isEmptyArray(value)
  );
};

export const validateField = (field: Field, value: any, allowEmpty = false) => {
  if (isEmpty(value) && allowEmpty) return '';

  if (isEmpty(value) && !allowEmpty) return 'Field cannot be blank.';

  if (field === 'email' && !isValidEmail(value)) return 'Email is invalid.';

  return '';
};

/* eslint-disable no-useless-escape */
export const isValidEmail = (value: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};
