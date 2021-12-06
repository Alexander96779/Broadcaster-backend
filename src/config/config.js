import { config } from 'dotenv';

config();

export default {

  "development": {
    "username": process.env.DATABASE_USERNAME,
    "password": null,
    "database": process.env.DATABASE_URL_DEV,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": 'DATABASE_URL',
    "dialect": 'postgres',
    "dialectOptions": {
      ssl: { require: true, rejectUnauthorized: false },
    }
  }
};
