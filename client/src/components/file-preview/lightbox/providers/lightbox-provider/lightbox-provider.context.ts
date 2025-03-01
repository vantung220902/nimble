import React from 'react';
import { LightboxData } from '.';

/**
 * The `LightboxAction` type defines actions related to managing the Lightbox state. It includes functions to show and hide the Lightbox with specific data.
 */
export type LightboxAction = {
  showLightbox: (payload: LightboxData) => void;
  hideLightbox: () => void;
};

export type LightboxContextProps = LightboxAction & {};

export const LightboxContext = React.createContext<LightboxContextProps | undefined>(undefined);

/**
 * The useLightbox hook is designed to be used within components, enabling easy access to the LightboxContext and its associated actions to trigger the lightbox state.
 * It throws an error if used outside the context of a LightboxProvider, ensuring proper usage within the application.
 *
 * @function
 * @returns {LightboxContextProps} - The context values and actions related to the Lightbox.
 * @throws {Error} - Throws an error if used outside the context of a LightboxProvider.
 */
export const useLightbox = (): LightboxContextProps => {
  const lightboxContext = React.useContext(LightboxContext);

  if (lightboxContext === undefined) {
    throw new Error(
      'useLightbox must be used within a LightboxProvider. Please wrap your component with a LightboxProvider to use this hook.',
    );
  }

  return lightboxContext;
};
