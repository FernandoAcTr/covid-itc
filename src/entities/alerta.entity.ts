import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Usuario } from './usuario.entity'

export enum AlertEnum {
  PENDIENTE = 'pendiente',
  LEIDA = 'leida',
}

@Entity({ orderBy: { create_at: 'DESC' } })
export class Alerta {
  @PrimaryGeneratedColumn('uuid')
  alerta_id: string

  @Column({ type: 'text' })
  alerta: string

  @ManyToOne(() => Usuario, (usuario) => usuario.alertas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario

  @Column({
    type: 'enum',
    enum: AlertEnum,
    default: AlertEnum.PENDIENTE,
  })
  status: AlertEnum

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}
