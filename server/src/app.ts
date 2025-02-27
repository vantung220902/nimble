import { ConfigModule } from '@config';
import { HealthModule } from '@health';
import { LoggerModule } from '@logger';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database';

@Module({
  imports: [ConfigModule, HealthModule, DatabaseModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
