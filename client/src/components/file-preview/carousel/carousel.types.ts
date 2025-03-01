import { SwiperProps } from 'swiper/react';

export type CarouselProps = Omit<SwiperProps, 'Slide' | 'controller' | 'modules'> & {
  nextControlIcon?: React.ReactNode;
  previousControlIcon?: React.ReactNode;
};
