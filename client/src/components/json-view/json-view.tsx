import { Box, Text } from '@mantine/core';
import { FC } from 'react';
import ReactJson from 'react-json-view';

type Props = { src: any; title?: string };

const JsonView: FC<Props> = ({ src, title }) => {
  return (
    <Box p={2}>
      {title && <Text size="lg">{title}</Text>}
      <ReactJson src={src} />
    </Box>
  );
};

export default JsonView;
