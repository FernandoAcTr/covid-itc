import { Column } from 'typeorm'
export abstract class Persona {
  @Column()
  nombre: string

  @Column()
  a_paterno: string

  @Column()
  a_materno: string
}
