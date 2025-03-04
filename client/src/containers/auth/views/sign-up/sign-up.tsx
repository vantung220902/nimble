import { Form, FormInputPassword, FormInputText } from '@components';
import { AppLoadingOverlay } from '@components/app-loading-overlay';
import { IMAGES } from '@config/images';
import { authPaths } from '@containers/auth/route';
import SignUpVerificationModal from '@containers/auth/views/sign-up/sign-up-verification';
import { yupResolver } from '@hookform/resolvers/yup';
import { Anchor, Box, Button, Paper, Stack, Text, Title, rem } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { useSignUp } from '@queries';
import { ErrorService, Toastify } from '@services';
import { useCommonStore } from '@stores';
import { deepKeysHookFormErrors, waiter } from '@utils';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpFormHelper, SignUpFormType } from '.';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${IMAGES.nimble})`,
  },
  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: rem(800),
    position: 'relative',
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  input: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    '&::placeholder': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },
  },
  inputLabel: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const SignUp: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const { onSetIsOpenDialog } = useCommonStore();

  const { onSignUp, isSubmitting, isSuccess } = useSignUp();
  const { control, handleSubmit, setError, getValues } = useForm<SignUpFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: SignUpFormHelper.initialValues,
    resolver: yupResolver<any>(SignUpFormHelper.schema),
  });

  const onValidSubmit = (value: SignUpFormType) => {
    const { password, confirmPassword } = value;

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        message: ErrorService.MESSAGES.matchConfirmPassword,
      });
      return null;
    }

    const payload = Object.entries(value).reduce((acc: { [key: string]: string }, [key, value]) => {
      acc[key] = value.trim();

      return acc;
    }, {}) as SignUpFormType;

    return onSignUp(payload, {
      onSuccess(data) {
        Toastify.success('Sign up successfully');

        onSetIsOpenDialog(true);
      },
      onError(error) {
        ErrorService.handler(error);
      },
    });
  };

  const onInvalidFormSubmit = (formErrors: FieldErrors<SignUpFormType>) => {
    ErrorService.handleScrollToTopError(deepKeysHookFormErrors(formErrors));
  };

  const onVerifySuccess = async () => {
    Toastify.success('Verify account is successfully!');
    setIsNavigating(true);

    waiter(1000).then(() => {
      navigate(authPaths.signIn);
    });
  };

  return (
    <Box>
      <AppLoadingOverlay visible={isNavigating} message="Almost there..." />
      <Box className={classes.wrapper}>
        <Paper className={classes.form} px={rem(160)} pt={rem(200)} radius={0}>
          <Title order={3} className={classes.title} ta="left" mt="md" mb={24}>
            Sign Up
          </Title>

          <Form onSubmit={handleSubmit(onValidSubmit, onInvalidFormSubmit)} autoComplete="off">
            <Stack>
              <FormInputText
                title="Email"
                placeholder="Enter your email"
                name="email"
                required
                control={control}
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />

              <FormInputText
                title="First name"
                placeholder="Enter your first name"
                name="firstName"
                required
                control={control}
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />

              <FormInputText
                title="Last name"
                placeholder="Enter your last name"
                name="lastName"
                required
                control={control}
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />

              <FormInputPassword
                title="Password"
                placeholder="Enter your password"
                name="password"
                required
                control={control}
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />
              <FormInputPassword
                title="Confirm password"
                placeholder="Enter confirm password"
                name="confirmPassword"
                required
                control={control}
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />

              <Button
                type="submit"
                fullWidth
                mt="xl"
                className={classes.control}
                loading={isSubmitting}
              >
                Sign Up
              </Button>
            </Stack>
          </Form>

          <Text ta="center" mt="md">
            Already have an account?{' '}
            <Anchor component={Link} to={authPaths.signIn} fw={700}>
              Sign In
            </Anchor>
          </Text>
        </Paper>
      </Box>

      {isSuccess && (
        <SignUpVerificationModal email={getValues('email')} onVerifySuccess={onVerifySuccess} />
      )}
    </Box>
  );
};

export default SignUp;
