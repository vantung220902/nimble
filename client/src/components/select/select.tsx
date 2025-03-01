//@ts-nocheck
import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';
import { isEmpty } from '@utils';
import { isString } from 'lodash';
import React, { FC } from 'react';

export type SelectProps = MantineSelectProps & {
  required?: boolean;
  title?: string;
  ref?: React.Ref<HTMLInputElement>;
};

const Select: FC<SelectProps> = React.forwardRef(
  (
    {
      title,
      error,
      icon,
      description,
      iconPosition = 'right',
      placeholder,
      label,
      required,
      disabled,
      ...props
    },
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const hasError = !isEmpty(error);

    return (
      <MantineSelect
        label={title || label}
        placeholder={placeholder || isString(label) ? `${label}` : 'Select'}
        error={hasError ? error : null}
        description={description}
        withAsterisk={required}
        width="100%"
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  },
);

export default Select;
