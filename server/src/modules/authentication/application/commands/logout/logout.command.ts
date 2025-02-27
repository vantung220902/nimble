import { RequestUser } from '@common/interfaces';

export class LogoutCommand {
  constructor(
    public readonly accessToken: string,
    public readonly reqUser: RequestUser,
  ) {}
}
