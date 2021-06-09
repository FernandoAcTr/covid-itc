import { Multimedia } from '../entities'

import { s3 } from '../libs/multer'
import { settings } from '../config/settings'

export async function deleteFile(file: Multimedia) {
  s3.deleteObject(
    {
      Bucket: settings.AWS.BUCKET_NAME!,
      Key: file.public_id,
    },
    function (err, data) {
      if (err) console.error(err)
      else console.log('File deleted: ', file.public_id)
    }
  )
}

export async function deleteFiles(files: Multimedia[]) {
  for (const file of files) {
    deleteFile(file)
  }
}

export function transformFilesInMultimedia(files: Express.Multer.File[]) {
  const multimedias: Multimedia[] = []
  if (files)
    for (const file of files) {
      const multimedia = new Multimedia()
      multimedia.url = (file as any).location
      multimedia.public_id = (file as any).key
      multimedias.push(multimedia)
    }
  return multimedias
}
