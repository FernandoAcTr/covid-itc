import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Persona } from './persona'
import { Usuario } from './usuario.entity'
import { Carrera } from './carrera.entity'

@Entity()
export class Estudiante extends Persona {
  @PrimaryGeneratedColumn('uuid')
  estudiante_id: string

  @ManyToOne(() => Carrera, {
    eager: true,
    cascade: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera

  @OneToOne(() => Usuario, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario
}
