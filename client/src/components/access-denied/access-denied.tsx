import { Button, Container, Group, Text, Title, rem } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { IconLock } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(120),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  content: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
  },

  icon: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(20),
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(20),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
  },

  button: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

interface AccessDeniedProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function AccessDenied({ title, description, buttonText, buttonLink }: AccessDeniedProps) {
  const { classes } = useStyles();

  return (
    <Container className={classes.root} size={460} p="md">
      <div className={classes.content}>
        <IconLock size={100} stroke={1.5} className={classes.icon} />
        <Title order={3} mb="md" className={classes.title}>
          {title}
        </Title>
        <Text size="md" mb="md" className={classes.description}>
          {description}
        </Text>
        <Group justify="center">
          <Button component={Link} to={buttonLink} size="sm" className={classes.button}>
            {buttonText}
          </Button>
        </Group>
      </div>
    </Container>
  );
}
