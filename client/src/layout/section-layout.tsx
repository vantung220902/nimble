import { Container, ContainerProps, Paper, PaperProps } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  ContainerProps?: ContainerProps;
  PaperProps?: PaperProps;
  /**
   * @default true
   */
  hasContainer?: boolean;
};

const SectionLayout: FC<Props> = ({
  children,
  ContainerProps,
  PaperProps,
  hasContainer = true,
}) => {
  if (!hasContainer) {
    return (
      <Paper withBorder p="md" {...PaperProps}>
        {children}
      </Paper>
    );
  }
  return (
    <Container fluid {...ContainerProps}>
      <Paper withBorder p="md" radius="md" {...PaperProps}>
        {children}
      </Paper>
    </Container>
  );
};

export default SectionLayout;
