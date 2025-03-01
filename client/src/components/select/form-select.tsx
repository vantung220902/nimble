import { UseControllerProps, useController } from 'react-hook-form';
import Select, { SelectProps } from './select';

export const FormSelect = ({ control, ...props }: FormInputProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return <Select {...field} {...props} error={fieldState.error?.message} />;
};

type FormInputProps<T = any> = UseControllerProps<T> & SelectProps;

export default FormSelect;
