import dotenv from 'dotenv'
dotenv.config()
export const settings = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET || 'somesecrettoken',
  DB: {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
  },
  AWS: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    BUCKET_NAME: process.env.BUCKET_NAME,
  },
  EMAIL_CREDENTIALS: {
    EMAIL: process.env.EMAIL,
    ACCESS_TOKEN: process.env.EMAIL_ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN,
    CLIENT_ID: process.env.EMAIL_CLIENT_ID,
    CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
  },
}
