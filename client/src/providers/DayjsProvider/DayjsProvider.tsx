import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc';
import { FC, PropsWithChildren } from 'react';

dayjs.extend(utc);

type Props = PropsWithChildren & {};

const DayjsProvider: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default DayjsProvider;
