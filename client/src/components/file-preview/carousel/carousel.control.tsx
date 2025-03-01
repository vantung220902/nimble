import { ActionIcon } from '@mantine/core';
import { emptyFunction } from '@utils';
import React from 'react';
import { GrFormNext as NextIcon, GrFormPrevious as PrevIcon } from 'react-icons/gr';
import { useCarousel } from '.';

const defaultControlIcons = {
  prev: <PrevIcon color="white" />,
  next: <NextIcon color="white" />,
};

type DefaultControlIconProps = {
  type: 'prev' | 'next';
};

const DefaultControlIcon = ({ type }: DefaultControlIconProps) => {
  return (
    <ActionIcon
      sx={{
        bgcolor: 'rgba(0,0,0,0.2)',
      }}
    >
      {defaultControlIcons[type]}
    </ActionIcon>
  );
};

type ControlButtonsProps = {
  direction: 'horizontal' | 'vertical';
  nextControlIcon?: React.ReactNode;
  previousControlIcon?: React.ReactNode;
};

export const ControlButtons = ({
  direction,
  nextControlIcon,
  previousControlIcon,
}: ControlButtonsProps) => {
  const carousel = useCarousel();

  const handleNext = () => {
    carousel.slideNext();
  };

  const handlePrev = () => {
    carousel.slidePrev();
  };

  return (
    <>
      <div
        className="cmp-carousel__btn cmp-carousel__btn--prev"
        data-carousel-direction={direction}
        onKeyDown={emptyFunction}
        onClick={handlePrev}
        role="button"
        tabIndex={0}
      >
        {previousControlIcon ? previousControlIcon : <DefaultControlIcon type="prev" />}
      </div>

      <div
        className="cmp-carousel__btn cmp-carousel__btn--next"
        data-carousel-direction={direction}
        onKeyDown={emptyFunction}
        onClick={handleNext}
        role="button"
        tabIndex={0}
      >
        {nextControlIcon ? nextControlIcon : <DefaultControlIcon type="next" />}
      </div>
    </>
  );
};
