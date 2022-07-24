import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { HealthModule } from './modules/health/health.module';
import { WinstonConfigService } from './shared/services/winston-config.service';
import { PostsModule } from './modules/posts/posts.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './shared/extras/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: WinstonConfigService,
    }),
    HealthModule,
    PostsModule,
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
  ],
  providers: [Logger],
})
export class AppModule {}
