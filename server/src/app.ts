import { AppConfig, ConfigModule } from '@config';
import { HealthModule } from '@health';
import { LoggerModule } from '@logger';
import { AuthenticationModule } from '@modules/authentication';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { EmailModule } from '@email';
import { DatabaseModule } from '@database';

@Module({
  imports: [
    ConfigModule,
    HealthModule,
    DatabaseModule,
    LoggerModule,
    AuthenticationModule,
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [AppConfig],
      useFactory: (appConfig: AppConfig) => ({
        stores: createKeyv(appConfig.redisUrl),
      }),
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
