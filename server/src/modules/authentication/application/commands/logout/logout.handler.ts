import { CommandHandlerBase } from '@common/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { LogoutCommand } from './logout.command';

@CommandHandler(LogoutCommand)
export class LogoutHandler extends CommandHandlerBase<LogoutCommand, void> {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly cacheService: Cache,
  ) {
    super();
  }

  public execute(command: LogoutCommand): Promise<void> {
    return this.logout(command);
  }

  public async logout({ accessToken, reqUser }: LogoutCommand): Promise<void> {
    const decodedAccessToken = await this.jwtService.decode(accessToken);
    const accessTokenJwtExpiresIn = decodedAccessToken.exp * 1000;

    const ttl = accessTokenJwtExpiresIn - Date.now();

    if (ttl > 0) {
      await this.cacheService.set(`blacklist:${accessToken}`, 'block', ttl);
    }

    this.logger.log(`Email ${reqUser.email} logout successfully`);
  }
}
