import { createConnection } from 'typeorm'
import { settings } from '../config/settings'
const { DB } = settings

createConnection({
  type: 'mysql',
  host: DB.HOST,
  port: Number(DB.PORT),
  username: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
  synchronize: false,
  logging: false,
  entities: ['build/entities/**/*.js'],
  migrations: ['build/database/migrations/*.js'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/database/migrations',
  },
})
  .then(() => {
    console.log('Mysql conection is online...')
  })
  .catch(console.log)
