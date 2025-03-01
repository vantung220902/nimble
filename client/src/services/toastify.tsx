/* eslint-disable no-console */
import { FC, ReactNode } from 'react';
import { ToastOptions, toast } from 'react-toastify';

const error = (error?: string, options?: ToastOptions) => {
  console.log('errorHandler', error);
  toast.error(
    <Message msg={error || 'An error has occurred. Please check your data and try again.'} />,
    options,
  );
};

const success = (message: string, options?: ToastOptions) => {
  toast.success(<Message msg={message} />, options);
};

const warning = (message: string, options?: ToastOptions) => {
  console.log('warningHandler', message);
  toast.warning(<Message msg={message} />, options);
};
const info = (message: string, options?: ToastOptions) => {
  toast.info(<Message msg={message} />, options);
};

const Message: FC<{ msg: string | ReactNode }> = ({ msg }) => {
  return <span>{msg}</span>;
};

export default {
  error,
  success,
  warning,
  info,
};
