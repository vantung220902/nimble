import { Button, Group, rem, Text } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import { IconPencil } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import InputText, { InputTextProps } from './input-text';

type FormInputProps<T = any> = any & UseControllerProps<T> & InputTextProps;

const useStyles = createStyles((theme) => ({
  textDisplay: {
    cursor: 'pointer',
    fontSize: theme.fontSizes.sm,
    height: rem(30),
    marginLeft: theme.spacing.xs,
    display: 'flex',
    alignItems: 'center',
  },
  inputText: {
    fontSize: theme.fontSizes.sm,
    backgroundColor: theme.colors.gray[0],
    height: rem(30),
  },
  buttonGroup: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    marginBottom: theme.spacing.xs,
  },
  icon: {
    marginLeft: theme.spacing.xs,
    cursor: 'pointer',
  },
}));

const FormInputTextLine = ({ control, label, ...props }: FormInputProps) => {
  const { classes } = useStyles();
  const { field, fieldState } = useController({
    name: props.name,
    control,
    defaultValue: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(field.value);
  const [originalValue, setOriginalValue] = useState(field.value);

  useEffect(() => {
    setTempValue(field.value);
    setOriginalValue(field.value);
  }, [field.value]);

  const handleSave = () => {
    field.onChange(tempValue);
    setOriginalValue(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(originalValue);
    field.onChange(originalValue);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setOriginalValue(field.value);
    setTempValue(field.value);
    setIsEditing(true);
  };

  const handleBlur = () => {
    handleSave();
  };

  return (
    <div>
      <Text className={classes.label}>{label}</Text>
      {isEditing ? (
        <div>
          <InputText
            className={classes.inputText}
            {...field}
            {...props}
            value={tempValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setTempValue(e.currentTarget.value);
            }}
            onBlur={handleBlur}
            error={fieldState.error?.message}
          />
          <Group className={classes.buttonGroup} gap={2}>
            <Button onClick={handleSave} size="xs" color="blue">
              Save
            </Button>
            <Button onClick={handleCancel} size="xs" color="red" variant="outline">
              Cancel
            </Button>
          </Group>
        </div>
      ) : (
        <div className={classes.textDisplay} onClick={handleEdit}>
          <Text size="sm">{field.value || 'Click to edit'}</Text>
          <IconPencil size={14} className={classes.icon} onClick={handleEdit} />
        </div>
      )}
    </div>
  );
};

export default FormInputTextLine;
