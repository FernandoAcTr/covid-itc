import { cloudinary } from '../config/cloudinary'
import { unlink } from 'fs/promises'
import { extname } from 'path'
import { UploadApiResponse } from 'cloudinary'
import { Multimedia } from '../entities'

const types: any = {
  '.3gp': 'video',
  '.mp4': 'video',
  '.gif': 'image',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.png': 'image',
}

export function uploadFile(
  file: Express.Multer.File
): Promise<UploadApiResponse | undefined> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      file.path,
      {
        folder: 'covid19_itc',
        resource_type: types[extname(file.filename)],
      },
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
        unlink(file.path)
      }
    )
  })
}

export async function deleteFile(file: Multimedia) {
  await cloudinary.uploader.destroy(file.public_id)
}

export async function deleteFiles(files: Multimedia[]) {
  for (const file of files) {
    await cloudinary.uploader.destroy(file.public_id)
  }
}
