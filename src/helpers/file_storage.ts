import { Multimedia } from '../entities'

import { s3 } from '../config/multer'
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
