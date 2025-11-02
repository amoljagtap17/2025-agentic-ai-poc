import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        // PORT: Joi.number().port().default(3000),
        DATABASE_URL: Joi.string().uri().required(),
        CLIENTS_SUBGRAPH_GRAPHQL_URL: Joi.string().uri().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigModule {}

export { ConfigService };
