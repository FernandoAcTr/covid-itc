import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Persona } from './persona'
import { Usuario } from './usuario.entity'

@Entity()
export class Medico extends Persona {
  @PrimaryGeneratedColumn('uuid')
  medico_id: string

  @Column({ length: 13 })
  rfc: string

  @Column({ length: 8 })
  cedula: string

  @ManyToOne(() => Usuario, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario
}
