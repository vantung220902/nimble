import { Form, FormInputPassword, FormInputText } from '@components';
import { IMAGES } from '@config/images';
import { authPaths } from '@containers/auth/route';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Anchor, Button, Checkbox, Paper, rem, Stack, Text, Title } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { SignInPayload, useSignIn } from '@queries';
import { TokenService } from '@services';
import { scrollToTopError } from '@services/error.service';
import { deepKeysHookFormErrors } from '@utils';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SignInFormHelper } from './sign-in.helpers';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${IMAGES.background})`,
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: rem(120),
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.xl,
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

const SignIn: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { onSignIn, isSubmitting } = useSignIn();
  const [errors, setErrors] = useState<string | undefined>('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const { handleSubmit, control } = useForm<SignInPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: SignInFormHelper.initialValues,
    resolver: yupResolver<any>(SignInFormHelper.schema),
  });

  const onValidSubmit = (values: SignInPayload) => {
    const { email, password } = values;

    console.log('email', 'password', email, password);

    const payload = {
      email: email.trim(),
      password: password.trim(),
      rememberMe: rememberPassword,
    };

    return onSignIn(payload, {
      onSuccess(data) {
        const { accessToken } = data;
        TokenService.setToken({ accessToken });

        const redirect = searchParams.get('redirect');
        if (redirect) {
          window.location.replace(redirect);
          return;
        }
        navigate('/');
      },
      onError(error) {
        setErrors(error?.message);
      },
    });
  };

  const onInvalidFormSubmit = (formErrors: FieldErrors<SignInPayload>) => {
    scrollToTopError(deepKeysHookFormErrors(formErrors));
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={4} c="blue" className={classes.title} ta="center" mt="md" mb={50}>
          Sign in
        </Title>

        <Form onSubmit={handleSubmit(onValidSubmit, onInvalidFormSubmit)}>
          <Stack>
            <FormInputText
              name="email"
              title="Email"
              required
              control={control}
              placeholder="Enter your email"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <FormInputPassword
              name="password"
              title="Password"
              required
              control={control}
              placeholder="Enter your password"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <Checkbox
              label="Remember password"
              checked={rememberPassword}
              onChange={(event) => setRememberPassword(event.currentTarget.checked)}
              color="blue"
            />
          </Stack>
          {errors && (
            <Alert color="red" title="Error" mt="md" mb="lg">
              <Text size="sm" c="red">
                {errors}
              </Text>
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            mt="xl"
            className={classes.control}
            loading={isSubmitting}
          >
            Sign In
          </Button>
        </Form>

        <Text ta="center" mt="md">
          Don't have an account?{' '}
          <Anchor component={Link} to={authPaths.signUp} fw={700}>
            Sign up
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default SignIn;
