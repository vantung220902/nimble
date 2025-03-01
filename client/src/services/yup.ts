import * as yup from 'yup';

export type ConditionalSchema<T> = T extends string
  ? yup.StringSchema
  : T extends number
  ? yup.NumberSchema
  : T extends boolean
  ? yup.BooleanSchema
  : T extends Record<any, any>
  ? yup.AnyObjectSchema
  : T extends Array<any>
  ? yup.ArraySchema<any, any>
  : yup.AnySchema;

export type CustomShape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

yup.setLocale({
  mixed: {
    required: 'This field is required.',
  },
  string: {
    email: 'Email is invalid',
    // eslint-disable-next-line
    min: 'This field must be at least ${min} characters',
    // eslint-disable-next-line
    max: 'You have reached the maximum length of ${max} characters',
  },
});

declare module 'yup' {
  interface StringSchema {
    password(_message?: string): StringSchema;
  }
}

yup.addMethod<yup.StringSchema>(yup.string, 'password', function (message) {
  return this.test('isValidName', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    if (!/.{10,}/.test(value)) {
      return createError({
        path,
        message: message ?? 'Your password must be at least 10 characters.',
      });
    }
    if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
      return createError({
        path,
        message: message ?? 'Your password must have at least one upper and lower case letter',
      });
    }
    if (!/[0-9]/.test(value)) {
      return createError({
        path,
        message: message ?? 'Your password must have at one number',
      });
    }
    if (!/.*[!@#$%?=*&.]/.test(value)) {
      return createError({
        path,
        message: message ?? 'Your password must have at one special character',
      });
    }

    return true;
  });
});

export default yup;
