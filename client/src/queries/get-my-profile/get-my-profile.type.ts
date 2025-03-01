import { UserStatus } from '@stores';

export type MyProfile = {
  id: string;
  email: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  status: UserStatus;
};
