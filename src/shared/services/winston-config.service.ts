import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as Transport from 'winston-transport';
import { EnvironmentEnum } from '../enums/environment.enum';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createWinstonModuleOptions(): Promise<WinstonModuleOptions> {
    const { PRODUCTION, SANDBOX, STAGING } = EnvironmentEnum;
    const level = this.configService.get<string>('LOG_LEVEL', 'debug');
    const nodeEnv = this.configService.get<EnvironmentEnum>('NODE_ENV');
    const appName = this.configService.get<string>('npm_package_name');
    const logGroup = `testeType/microservices/${nodeEnv}`;

    const transports: Transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
    ];

    return { level, transports };
  }
}
