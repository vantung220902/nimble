import { PasswordInput, PasswordInputProps } from '@mantine/core';
import { isEmpty } from '@utils';
import { FC, forwardRef, Ref } from 'react';
import { IoInformationCircle } from 'react-icons/io5';

export type InputPasswordProps = PasswordInputProps & {
  title?: string;
  error?: string;
  icon?: any;
  required?: boolean;
};

const InputPassword: FC<InputPasswordProps> = forwardRef(
  ({ error, icon, placeholder, title, required, ...props }, ref: Ref<HTMLInputElement>) => {
    const hasError = !isEmpty(error);

    return (
      <PasswordInput
        label={title}
        placeholder={placeholder || title}
        error={hasError ? error : null}
        styles={{
          root: {
            width: '100%',
          },
        }}
        ref={ref}
        withAsterisk={required}
        leftSection={icon}
        {...(hasError && {
          rightSection: <IoInformationCircle size={18} color="var(--mantine-color-error)" />,
        })}
        {...props}
      />
    );
  },
);

export default InputPassword;
