import { UseControllerProps, useController } from 'react-hook-form';
import InputFile, { InputFileProps } from './input-file';

export const FormInputFile = ({ control, ...props }: FormInputProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return <InputFile {...field} {...props} error={fieldState.error?.message} />;
};

type FormInputProps<T = any> = UseControllerProps<T> & InputFileProps;

export default FormInputFile;
