import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum UserStatus {
  HABILITADO = 'HABILITADO',
  DESHABILITADO = 'DESHABILITADO',
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  usuario_id: string

  @Column({ length: 100 })
  email: string

  @Column({ length: 72 })
  password: string

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.HABILITADO,
  })
  status: UserStatus

  @Column({ default: false })
  sospechoso: Boolean
}
