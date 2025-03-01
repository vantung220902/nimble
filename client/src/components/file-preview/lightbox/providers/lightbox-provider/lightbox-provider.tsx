import { Lightbox } from '@components';
import React, { useCallback, useState } from 'react';
import { LightboxContext, LightboxData, LightboxProviderProps, LightboxState } from '.';

const LightboxProvider = ({ children }: LightboxProviderProps) => {
  const [lightboxState, setLightboxState] = useState<LightboxState | undefined>(undefined);

  const showLightbox = useCallback((payload: LightboxData) => {
    setLightboxState({ ...payload });
  }, []);

  const hideLightbox = useCallback(() => {
    setLightboxState(undefined);
  }, []);

  return (
    <LightboxContext.Provider value={{ showLightbox, hideLightbox }}>
      {!!lightboxState && <Lightbox data={lightboxState} />}
      {children}
    </LightboxContext.Provider>
  );
};

export default LightboxProvider;
