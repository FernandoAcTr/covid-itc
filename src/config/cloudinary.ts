import { v2 as cloudinary } from 'cloudinary'
import { settings } from './settings'
const { CLOUDINARY } = settings

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
})

export { cloudinary }
