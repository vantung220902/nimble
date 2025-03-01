import { ActionButton } from './action-button';
import { LightboxHeader } from './lightbox-header';
import { LightboxContainer } from './lightbox-wrapper';

type LightboxModalType = {
  Container: typeof LightboxContainer;
  Header: typeof LightboxHeader;
  Actions: typeof ActionButton;
};

export const LightboxModal: LightboxModalType = {
  Container: LightboxContainer,
  Header: LightboxHeader,
  Actions: ActionButton,
};
