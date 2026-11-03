import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/configuration.js';
import { envValidationSchema } from './config/env.validation.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: envValidationSchema,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
