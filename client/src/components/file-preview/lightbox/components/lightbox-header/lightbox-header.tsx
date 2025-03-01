import { Group, Stack } from '@mantine/core';
import { LightboxHeaderProps } from '.';

const LightboxHeader = ({ title, paginationCmp, children }: LightboxHeaderProps) => {
  const disabledEventPropagation = (event: { stopPropagation: () => void }) => {
    event?.stopPropagation();
  };

  return (
    <Group
      onClick={disabledEventPropagation}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '50px',
        backgroundColor: 'black',
        padding: '0 2rem',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </span>

      <Stack>{paginationCmp}</Stack>

      {children}
    </Group>
  );
};

export default LightboxHeader;
