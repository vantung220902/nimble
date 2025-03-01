import { ActionIcon, Group } from '@mantine/core';
import React from 'react';
import {
  BiX as CloseIcon,
  BiDownload as DownloadIcon,
  BiRotateLeft as LeftRotateIcon,
  BiRotateRight as RightRotateIcon,
  BiZoomIn as ZoomInIcon,
  BiZoomOut as ZoomOutIcon,
} from 'react-icons/bi';
import { useLightboxAction } from '../../providers';
import { ActionButtonProps } from './action-button.types';

const ActionButton = ({
  hasRotate = false,
  hasScale = false,
  onZoomIn,
  onZoomOut,
}: ActionButtonProps) => {
  const { zoomIn, zoomOut, rotateLeft, rotateRight, onDownload, onClose } = useLightboxAction();

  const handleZoomIn = onZoomIn || zoomIn;
  const handleZoomOut = onZoomOut || zoomOut;

  const actionButtons = [
    hasScale && { onClick: handleZoomIn, icon: <ZoomInIcon size={20} /> },
    hasScale && { onClick: handleZoomOut, icon: <ZoomOutIcon size={20} /> },
    hasRotate && { onClick: rotateLeft, icon: <LeftRotateIcon size={20} /> },
    hasRotate && { onClick: rotateRight, icon: <RightRotateIcon size={20} /> },
    onDownload && { onClick: onDownload, icon: <DownloadIcon size={20} /> },
    { onClick: onClose, icon: <CloseIcon size={24} /> },
  ].filter(Boolean) as { onClick: Callback; icon: React.ReactNode }[];

  return (
    <Group gap={'8px'}>
      {actionButtons.map(({ onClick, icon }, index) => (
        <ActionIcon
          key={`lightbox-action-button-${index}`}
          onClick={() => onClick()}
          variant="subtle"
          size="lg"
          color="#fff"
        >
          {icon}
        </ActionIcon>
      ))}
    </Group>
  );
};

export default ActionButton;
