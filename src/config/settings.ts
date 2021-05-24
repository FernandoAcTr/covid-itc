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
  CLOUDINARY: {
    API_KEY: process.env.CLOUDDINARY_API_KEY,
    API_SECRET: process.env.CLOUDDINARY_API_SECRET,
    CLOUD_NAME: process.env.CLOUDINARY_NAME,
    PLACEHOLDER_IMAGE: process.env.PLACEHOLDER_IMAGE,
  },
}
