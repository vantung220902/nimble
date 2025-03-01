import { EmotionSx } from '@mantine/emotion';

export const galleryPreviewStyles: EmotionSx = {
  '& .cmp-preview-file, & .cmp-decode-preview-file': {
    position: 'relative',
    marginRight: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',

    '&__remove': {
      position: 'absolute',
      right: '6px',
      top: '6px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '4px',
      fontWeight: 'bold',
      aspectRatio: '1',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 1,
    },

    '&__container': {
      borderRadius: '8px',
      overflow: 'hidden',
    },

    '&__image': {
      cursor: 'pointer',
      objectFit: 'cover',
    },
  },

  '& .file-title': {
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    position: 'absolute',
    bottom: 0,
    padding: '0 6px',
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
};
