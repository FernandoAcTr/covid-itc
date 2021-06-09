import path from 'path'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3, Endpoint } from 'aws-sdk'
import { Response, Request, NextFunction } from 'express'
import { settings } from '../config/settings'

const spacesEndpoint = new Endpoint(settings.AWS.S3_ENDPOINT!)
export const s3 = new S3({
  endpoint: spacesEndpoint,
})

const storage = multerS3({
  s3,
  bucket: settings.AWS.BUCKET_NAME!,
  acl: 'public-read',
  metadata: (req, file, callback) => {
    callback(null, { fieldName: file.fieldname })
  },
  key: (req, file, callback) => {
    callback(null, Date.now().toString() + path.extname(file.originalname))
  },
  contentType: (req, file, callback) => {
    callback(null, file.mimetype)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const validExtensions = [
      '.png',
      '.jpeg',
      '.jpg',
      '.gif',
      '.mp4',
      '.3gp',
      '.pdf',
    ]
    const ext = path.extname(file.originalname).toLowerCase()

    if (validExtensions.includes(ext)) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 },
}).fields([{ name: 'evidencias', maxCount: 3 }])

export default (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        statusCode: 400,
        message: `${err.message} - ${err.code}: ${err.field}`,
      })
    } else {
      next()
    }
  })
}
