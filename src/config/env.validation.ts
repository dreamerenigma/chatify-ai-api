import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  APP_NAME: Joi.string().default('Chatify'),
  PORT: Joi.number().port().default(3000),
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('v1'),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3001'),
});
