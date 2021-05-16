import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  usuario_id: string

  @Column({ length: 100 })
  email: string

  @Column({ length: 72 })
  password: string

  @Column()
  status: Boolean

  @Column()
  sospechoso: Boolean
}
