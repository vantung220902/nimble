import { Box, Button, Container, Highlight, Text, Title } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dots from './dots';
import classes from './under-construction.module.css';

interface UnderConstructionProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  highlight?: string[];
  buttonPath?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title = 'Oopps, this page is under construction',
  highlight = 'under construction',
  description = 'Please come back later.',
  buttonLabel = 'Dashboard',
  buttonPath = '/',
}) => {
  const navigate = useNavigate();
  return (
    <Box className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <Box className={classes.inner}>
        <Highlight
          component={Title}
          className={classes.title}
          highlight={highlight}
          highlightStyles={{
            backgroundImage:
              'linear-gradient(45deg, var(--mantine-color-cyan-5), var(--mantine-color-indigo-5))',
            fontWeight: 700,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Highlight>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            {description}
          </Text>
        </Container>

        <Box className={classes.controls}>
          <Button className={classes.control} size="md" onClick={() => navigate(buttonPath)}>
            {buttonLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UnderConstruction;
