import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Persona } from './persona'
import { Departamento } from './departamento.entity'
import { Usuario } from './usuario.entity'

@Entity()
export class Personal extends Persona {
  @PrimaryGeneratedColumn('uuid')
  personal_id: string

  @Column()
  rfc: string

  @ManyToOne(() => Departamento, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'departamento_id' })
  departamento: Departamento

  @OneToOne(() => Usuario, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario
}
