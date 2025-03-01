import { Textarea, TextareaProps } from '@mantine/core';
import { isEmpty } from '@utils';
import { FC, forwardRef, Ref } from 'react';
import { IoInformationCircle } from 'react-icons/io5';

export type InputTextareaProps = TextareaProps & {
  title?: string;
  error?: string;
  icon?: any;
  iconPosition?: 'left' | 'right' | 'none';
  required?: boolean;
};

const InputTextarea: FC<InputTextareaProps> = forwardRef(
  (
    { error, icon, iconPosition = 'right', placeholder, title, required, ...props },
    ref: Ref<HTMLTextAreaElement>,
  ) => {
    const hasError = !isEmpty(error);

    return (
      <Textarea
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
        {...(iconPosition === 'left' && { leftSection: icon })}
        rightSection={
          hasError ? (
            <IoInformationCircle size={18} color="var(--mantine-color-error)" />
          ) : iconPosition === 'right' ? (
            icon
          ) : null
        }
        {...props}
      />
    );
  },
);

export default InputTextarea;
