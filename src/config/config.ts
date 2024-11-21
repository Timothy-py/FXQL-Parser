import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  appName: 'FXQL-Parser',
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
};
