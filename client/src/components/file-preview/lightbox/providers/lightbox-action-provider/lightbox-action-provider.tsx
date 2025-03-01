import React, { PropsWithChildren, useState } from 'react';

type LightboxActionContextProps = {
  scale: number;
  rotate: number;
  zoomIn: (value?: number) => void;
  zoomOut: (value?: number) => void;
  rotateLeft: Callback;
  rotateRight: Callback;
  onClose: Callback;
  onDownload?: Callback;
};

export const LightboxActionContext = React.createContext<LightboxActionContextProps | undefined>(
  undefined,
);

export const useLightboxAction = (): LightboxActionContextProps => {
  const lightBoxActions = React.useContext(LightboxActionContext);

  if (lightBoxActions === undefined) {
    throw new Error(
      'useLightboxAction must be used within a LightboxActionProvider. Please wrap your component with a LightboxActionProvider to use this hook.',
    );
  }

  return lightBoxActions;
};

export type LightboxActionProviderProps = PropsWithChildren & {
  onClose: Callback;
  onDownload?: Callback;
};

export const LightboxActionProvider = ({
  onClose,
  onDownload,
  children,
}: LightboxActionProviderProps) => {
  const [scale, setScale] = useState(1.0);
  const [rotate, setRotate] = useState(0);

  const zoomIn = (value = 0.2) => {
    setScale((current) => current + value);
  };

  const zoomOut = (value = 0.2) => {
    setScale((current) => current - value);
  };

  const rotateLeft = () => {
    setRotate((current) => current - 90);
  };

  const rotateRight = () => {
    setRotate((current) => current + 90);
  };

  return (
    <LightboxActionContext.Provider
      value={{ scale, rotate, zoomIn, zoomOut, rotateLeft, rotateRight, onClose, onDownload }}
    >
      {children}
    </LightboxActionContext.Provider>
  );
};
