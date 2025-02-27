import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import Joi from 'joi';

export const appSchema = {
  NODE_ENV: Joi.string()
    .valid('local', 'development', 'test', 'staging', 'production')
    .default('development'),
  APP_NAME: Joi.string().default('API Service'),
  APP_PORT: Joi.number().default(5000),
  API_URL: Joi.string(),
  API_KEY: Joi.string(),
  STAGE: Joi.string().default('dev'),
};

export const appConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,
  stage: process.env.STAGE,
}));

export type Environment =
  | 'local'
  | 'development'
  | 'test'
  | 'staging'
  | 'production';

export type Stage =
  | 'dev'
  | 'demo'
  | 'test'
  | 'qa'
  | 'stag'
  | 'uat'
  | 'sit'
  | 'prod';

@Injectable()
export class AppConfig {
  public readonly name: string;
  public readonly port: number;
  public readonly env: Environment;
  public readonly apiUrl: string;
  public readonly apiKey: string;
  public readonly stage: Stage;

  public get isLocal(): boolean {
    return this.env === 'local';
  }

  public get isProduction(): boolean {
    return this.env === 'production';
  }

  constructor(
    @Inject(appConfig.KEY)
    config: ConfigType<typeof appConfig>,
  ) {
    this.name = config.name;
    this.port = Number(config.port);
    this.env = config.env as Environment;
    this.apiUrl = config.apiUrl!;
    this.apiKey = config.apiKey?.split(',')?.[0];
    this.stage = config.stage as Stage;
  }
}
