import * as carouselModules from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ControlButtons } from './carousel.control';
import { CarouselProps } from './carousel.types';

import { Box } from '@mantine/core';
import { EmotionSx } from '@mantine/emotion';
import 'swiper/swiper-bundle.css';

const Carousel = ({
  loop,
  children,
  nextControlIcon,
  previousControlIcon,
  navigation = true,
  direction = 'horizontal',
  ...props
}: CarouselProps & {
  Slide?: typeof SwiperSlide;
}) => {
  return (
    <Box sx={carouselStyles}>
      <Swiper
        data-name="carousel"
        loop={loop}
        direction={direction}
        modules={[...Object.values(carouselModules)]}
        {...props}
      >
        {children}

        {navigation && (
          <ControlButtons
            direction={direction}
            nextControlIcon={nextControlIcon}
            previousControlIcon={previousControlIcon}
          />
        )}
      </Swiper>
    </Box>
  );
};

Carousel.Slide = SwiperSlide;
export default Carousel;

const carouselStyles: EmotionSx = {
  height: '100%',

  ' & .cmp-carousel': {
    '&__btn': {
      zIndex: 1,
      position: 'absolute',

      "&[data-carousel-direction='horizontal']": {
        top: '50%',
        transform: 'translateY(-50%)',
      },

      "&[data-carousel-direction='vertical']": {
        left: '50%',
        transform: 'rotate(90deg) translateY(50%)',
      },

      '&--prev': {
        "&[data-carousel-direction='horizontal']": {
          left: '10px',
        },

        "&[data-carousel-direction='vertical']": {
          top: '10px',
        },
      },

      '&--next': {
        "&[data-carousel-direction='horizontal']": {
          right: '10px',
        },

        "&[data-carousel-direction='vertical']": {
          bottom: '10px',
        },
      },
    },
  },
};
