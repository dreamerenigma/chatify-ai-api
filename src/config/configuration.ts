import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME ?? 'Chatify',
  environment: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),

  api: {
    prefix: process.env.API_PREFIX ?? 'api',
    version: process.env.API_VERSION ?? 'v1',
  },

  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3001',
}));
