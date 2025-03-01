import { EmotionSx } from '@mantine/emotion';

export const lightboxDocumentStyles: EmotionSx = {
  '& .light-box__document': {
    marginTop: '50px',
    maxHeight: 'calc(100vh - 50px)',
    overflow: 'auto',
    height: '100%',
    zIndex: 0,

    '&__doc, &__pdf, &__excel, &__ppt, &__csv': {
      width: 'clamp(60vw, 80vw, 100%)',
    },
  },
};
