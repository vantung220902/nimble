import { get } from 'lodash';
import { Toastify } from '.';
import { deepKeys, isEmpty } from '../utils';

type AuthErrorCode =
  | 'UserNotConfirmedException'
  | 'NotAuthorizedException'
  | 'UserNotFoundException'
  | 'CodeMismatchException'
  | 'ExpiredCodeException'
  | 'LimitExceededException'
  | 'InvalidPasswordException'
  | 'InvalidParameterException'
  | 'UsernameExistsException';

export interface AuthError {
  code?: AuthErrorCode;
  name?: string;
  message?: string;
}

export interface ErrorResponse {
  code: number;
  error: string;
  errorId: string;
  message: string;
  path: string;
  stack: any;
  success: boolean;
  timestamp: number;
}

const MESSAGES = {
  invalidEmail: 'Email is invalid',
  forbidden: 'Forbidden resource',
  unknown: 'An error has occurred',
  required: 'This field is required',
  shortRequired: 'Required',
  accountNotExist: 'Username does not exist',
  accountExist: 'An account with this email already exists.',
  userExistError: 'User is already existed.',
  incorrectAccount: 'Incorrect email or password',
  incorrectCredentials: 'Incorrect sign in credentials. Please try again.',
  incorrectPassword: 'Incorrect password.', // pragma: allowlist secret
  onlyLetter: 'Only English alphabets are allowed for this field.',
  alphanumeric: 'Alphanumeric characters',
  noSpaces: 'No spaces',
  noSpecialCharacters: 'No special characters',
  invalidRoutingNumber: 'Invalid routing number',
  onlyLetterAndNumber: 'Only alphabets or numeric are allowed for this field.',
  pleaseUseEnglishAlphabetForInput: 'Please use English alphabet for input.',
  inValidUsername: 'Please use only letters, numbers (0-9), underscore (_), dot (.), hyphen (-).',
  invalidCode: 'Invalid verification code provided, please try again.',
  awsDisabledMessage: 'User is disabled.',
  disabledMessage: 'The user has been deactivated',
  existEmail: 'An account with this email already existed.',
  matchConfirmPassword: 'This Confirm Password does not match', // pragma: allowlist secret
  emailAddressAlreadyExisted: 'An account with this email already existed.',
  canNotBlank: 'This field cannot be blank.',
  noResult: 'No results found.',
};

export const TYPES = {
  NotAuthorizedException: 'NotAuthorizedException',
  UserNotFoundException: 'UserNotFoundException',
  UserNotConfirmedException: 'UserNotConfirmedException',
  CodeMismatchException: 'CodeMismatchException',
  ExpiredCodeException: 'ExpiredCodeException',
  LimitExceededException: 'LimitExceededException',
  InvalidPasswordException: 'InvalidPasswordException', // pragma: allowlist secret
  UsernameExistsException: 'UsernameExistsException',
  UserLambdaValidationException: 'UserLambdaValidationException',
  badRequest: 'BAD_REQUEST',
};

const handler = (error: AuthError | Error | ErrorResponse) => {
  // eslint-disable-next-line no-console
  console.error(error);
  if (error?.message.includes('Attempt limit exceeded, please try after some time.')) {
    return Toastify.error(
      'The code you entered is incorrect more than 5 times. Please try after few minutes or resend email to receive the new code.',
    );
  }
  Toastify.error(error?.message?.toString() || MESSAGES.unknown);
};

const interceptorsErrorHandler = (error: (AuthError | Error) & { code?: string } = {}) => {
  console.error(error);
  const { code } = error;
  switch (code) {
    case TYPES.NotAuthorizedException:
    case TYPES.UserNotFoundException:
      return handler(error);
    default:
      return handler(error);
  }
};

export const scrollToTopError = (error: string[]) => {
  if (!isEmpty(error)) {
    const input = document.querySelector(`[name='${error[0]}']`);
    if (input) {
      const { parentElement } = input;
      parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      parentElement?.focus({ preventScroll: true });
    }
  }
};

export const handleScrollToTopError = <T>(errors: T) =>
  setTimeout(() => {
    scrollToTopError(deepKeys(errors));
  }, 100);

export const getErrorMessage = (
  fieldName: string,
  { touched, errors }: { touched: any; errors: any },
) => {
  if (!fieldName || !touched || !errors) return '';

  const error = get(errors, fieldName);

  return get(touched, fieldName) && error ? error : '';
};

export default {
  handler,
  interceptorsErrorHandler,
  MESSAGES,
  TYPES,
  handleScrollToTopError,
};
