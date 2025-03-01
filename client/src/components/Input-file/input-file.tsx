import { FileInput, FileInputProps } from '@mantine/core';
import { isEmpty } from '@utils';
import { FC, forwardRef, Ref } from 'react';
import { IoInformationCircle } from 'react-icons/io5';

export type InputFileProps = FileInputProps & {
  icon?: any;
  iconPosition?: 'left' | 'right' | 'none';
  required?: boolean;
  disabled?: boolean;
};

const InputFile: FC<InputFileProps> = forwardRef(
  (
    { icon, iconPosition = 'right', placeholder, title, required, error, ...props },
    ref: Ref<HTMLButtonElement>,
  ) => {
    const hasError = !isEmpty(error);

    return (
      <FileInput
        label={title}
        placeholder={placeholder || title || 'Select file'}
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
          hasError ? <IoInformationCircle size={18} color="var(--mantine-color-error)" /> : icon
        }
        {...props}
      />
    );
  },
);

export default InputFile;
