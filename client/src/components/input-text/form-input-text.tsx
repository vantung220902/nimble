import { UseControllerProps, useController } from 'react-hook-form';
import InputText, { InputTextProps } from './input-text';

export const FormInputText = ({ control, ...props }: FormInputProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return <InputText {...field} {...props} error={fieldState.error?.message} />;
};

type FormInputProps<T = any> = UseControllerProps<T> & InputTextProps;

export default FormInputText;
