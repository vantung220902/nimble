import { PropsWithChildren } from 'react';

export type LightboxHeaderProps = PropsWithChildren & {
  title: string;
  paginationCmp?: React.ReactNode;
};
