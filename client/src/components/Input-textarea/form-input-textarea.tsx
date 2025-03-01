import { UseControllerProps, useController } from 'react-hook-form';
import InputTextarea, { InputTextareaProps } from './Input-textarea';

export const FormInputTextarea = ({ control, ...props }: FormInputProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return <InputTextarea {...field} {...props} error={fieldState.error?.message} />;
};

type FormInputProps<T = any> = UseControllerProps<T> & InputTextareaProps;

export default FormInputTextarea;
