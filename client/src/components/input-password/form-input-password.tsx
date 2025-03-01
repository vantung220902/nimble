import { UseControllerProps, useController } from 'react-hook-form';
import InputPassword, { InputPasswordProps } from './input-password';

export const FormInputPassword = ({ control, ...props }: FormInputProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return <InputPassword {...props} {...field} error={fieldState.error?.message} />;
};

type FormInputProps<T = any> = UseControllerProps<T> & InputPasswordProps;

export default FormInputPassword;
