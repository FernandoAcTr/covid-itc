import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Usuario } from './usuario.entity'

export enum AlertEnum {
  PENDIENTE = 'pendiente',
  LEIDA = 'leida',
}

@Entity()
export class Alerta {
  @PrimaryGeneratedColumn('uuid')
  alerta_id: string

  @Column({ type: 'text' })
  alerta: string

  @ManyToOne(() => Usuario, (usuario) => usuario.alertas, { cascade: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario

  @Column({
    type: 'enum',
    enum: AlertEnum,
    default: AlertEnum.PENDIENTE,
  })
  status: AlertEnum
}
