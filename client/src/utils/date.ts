import dayjs, { Dayjs, OpUnitType, QUnitType } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import { isEmpty } from './validations';

dayjs.extend(weekday);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(advancedFormat);
dayjs.locale('vi');
dayjs.extend(relativeTime, {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 1 },
    { l: 'yy', d: 'year' },
  ],
  rounding: Math.floor,
});

export interface GetFromNowOptions {
  thresholdUnit?: QUnitType | OpUnitType;
  thresholdValue?: number;
  format?: string;
}

export enum DateFormat {
  MM_DD_YYYY = 'MM/DD/YYYY',
  DD_MM_YYYY = 'DD/MM/YYYY',
  MMMM_DD_YYYY = 'MMMM DD, YYYY',
  MMM_DD_YYYY = 'MMM DD, YYYY',
  MM_DD_YYYY_HH_MM = 'MM/DD/YYYY hh:mm',
  MM_DD_YYYY_HH_MM_A = 'MM/DD/YYYY hh:mm A',
  MM_DD_YYYY_HH_MM_SS_A = 'MM/DD/YYYY HH:MM:ss A',
  DD_MMMM_YYYY = 'DD MMMM, YYYY',

  HH_MM = 'hh:mm',
  HH_MM_A = 'hh:mm A',
  HST_TIMEZONE = 'Pacific/Honolulu',

  H_MM_SS_A_MMMM_DD_YYYY = 'h:mm:ss a, MMMM DD, YYYY',
  HH_MM_DD_MMMM_YYYY = 'hh:mm, DD MMMM, YYYY',
  DDDD_HH_MM_DD_MM_YYYY = 'dddd, hh:mm, DD/MM/YYYY',
  HH_MM_MM_DD_YYYY = 'hh:mm MM-DD-YYYY',
}

export const formatDate = (
  value: string | number | Date | dayjs.Dayjs,
  format = 'DD/MM/YYYY',
  { initValueFormat = '' } = {},
) => {
  if (!value) return '';
  if (!isEmpty(initValueFormat)) {
    return dayjs(value, initValueFormat).format(format);
  }

  return dayjs(value).format(format);
};

export const getWeekDay = (value: string) => {
  if (!value) return '';
  return dayjs(value).format('dddd');
};

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getDateDisplay = (value: string, format: string = DateFormat.MM_DD_YYYY) =>
  value ? dayjs(value).format(format) : null;

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getTimeDisplay = (value: string) => dayjs(value).format(DateFormat.HH_MM);

export const getTimeDisplayFromNow = (value: string) => dayjs(value).fromNow();

export const localTimeToHawaii = (
  dateTime: Dayjs | Date,
  format = DateFormat.MM_DD_YYYY_HH_MM,
  initFormat = DateFormat.MM_DD_YYYY_HH_MM_A,
) => {
  if (!dateTime) return null;

  const date = dayjs(dateTime).format(initFormat);
  return dayjs(date, initFormat).tz(DateFormat.HST_TIMEZONE).format(format);
};

export const localTimeToHawaiiTz = (dateTime?: Date | string | Dayjs | undefined) => {
  dayjs.tz.setDefault(DateFormat.HST_TIMEZONE);
  const date = dayjs(dateTime).set('hour', 0).set('minute', 0).set('second', 0);
  return dayjs(date).tz();
};

export const formatDateUtc = (value: Date | string) => {
  if (!value || (typeof value === 'string' && isEmpty(value))) {
    return '';
  }
  return dayjs(value).utc().format();
};

export const formatSecondToTimer = (seconds: number, format = 'HH:mm:ss') => {
  if (!seconds) return `${format}`;
  const durationObject = dayjs.duration(seconds, 'seconds');
  const formattedTime = durationObject.format(format);
  return formattedTime;
};

/**
 * Get from now
 * @param value string
 * @returns string
 */
export const getFromNow = (value: string) => {
  if (!value) return null;
  return dayjs(value).fromNow();
};

/**
 * Get timezone offset in minutes
 * @param timezone
 * @returns
 */
export const getTimezoneOffset = (timezone: string) => {
  // Set the timezone
  const now = dayjs().tz(timezone);

  // Get the timezone offset in minutes
  const offset = now.utcOffset();

  return offset;
};

/**
 * Compare two date is same
 * @param date1 string
 * @param date2 string
 * @returns boolean
 */
export const isSameDate = (date1: string, date2: string) => {
  if (!date1 || !date2) return false;
  return dayjs(date1).isSame(dayjs(date2), 'day');
};
