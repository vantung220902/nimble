import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { FC } from 'react';
import { IoRefreshOutline } from 'react-icons/io5';

type Props = ActionIconProps & {
  title?: string;
  onClick?: () => void;
};

const RefreshButton: FC<Props> = ({
  title = 'Refresh',
  size = 'compact-xs',
  variant = 'subtle',
  color = '#fff',
  onClick,
  ...props
}) => {
  return (
    <Tooltip label={title}>
      <ActionIcon
        title={title}
        sx={{
          minWidth: 'auto',
        }}
        size={size}
        variant={variant}
        onClick={onClick}
        color={color}
        {...props}
      >
        <IoRefreshOutline />
      </ActionIcon>
    </Tooltip>
  );
};

export default RefreshButton;
