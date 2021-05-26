import { createConnection } from 'typeorm'
import { settings } from '../config/settings'
import { readFileSync } from 'fs'
const { DB } = settings

createConnection({
  type: 'postgres',
  host: DB.HOST,
  port: Number(DB.PORT),
  username: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync('ca-certificate.crt').toString(),
  },
  entities: ['build/entities/*.entity.js'],
})
  .then(() => {
    console.log('Postgres conection is online...')
  })
  .catch(console.log)
