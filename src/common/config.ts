import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const configConst = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  DEBUG: process.env.DEBUG,
  ERROR: process.env.ERROR,
  LOG_LEVEL: process.env.LOG_LEVEL

};

export { configConst }
