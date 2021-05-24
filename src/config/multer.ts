import path from 'path'
import multer from 'multer'
import { Response, Request, NextFunction } from 'express'

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const validExtensions = ['.png', '.jpeg', '.jpg', '.gif', '.mp4', '.3gp']
    const ext = path.extname(file.originalname)

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
