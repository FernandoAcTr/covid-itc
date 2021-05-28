import handlebars from 'handlebars'
import { readFileSync } from 'fs'
import path from 'path'

export function compile(templateName: string, data: any): string {
  const template = readFileSync(
    path.resolve(__dirname, '../templates/' + templateName),
    'utf8'
  )

  return handlebars.compile(template)(data)
}
