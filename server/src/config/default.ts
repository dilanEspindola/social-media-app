import { config } from "dotenv";
config();

export default {
  DB: {
    DB_HOST: <string>process.env.DB_HOST,
    DB_NAME: <string>process.env.DB_NAME,
    DB_USERNAME: <string>process.env.DB_USERNAME,
    DB_PASSWORD: <string>process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT as unknown as number,
  },
  SECRET_KEY_JWT: <string>process.env.JWT_SECRET_KEY,
  GOOGLE_CREDENTIALS: {
    GOOGLE_CLIENT_ID: <string>process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: <string>process.env.GOOGLE_CLIENT_SECRET,
  },
};
