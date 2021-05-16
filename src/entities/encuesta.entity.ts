import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Usuario } from './usuario.entity'
import { Pregunta } from './pregunta.entity'

export enum ModalidadEnum {
  OBLIGATORIA = 'obligatoria',
  VOLUNTARIA = 'voluntaria',
  ALEATORIA = 'aleatoria',
}

@Entity()
export class Encuesta {
  @PrimaryGeneratedColumn()
  encuesta_id: number

  @ManyToOne(() => Usuario, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario

  @Column({ type: 'enum', enum: ModalidadEnum })
  modalidad: ModalidadEnum

  @Column({ type: 'text', nullable: true })
  otros_sintomas: string

  @CreateDateColumn()
  fecha_aplicacion: Date

  @ManyToMany(() => Pregunta, { eager: true })
  @JoinTable({
    name: 'encuesta_detalle',
    joinColumn: {
      name: 'encuesta_id',
      referencedColumnName: 'encuesta_id',
    },
    inverseJoinColumn: {
      name: 'pregunta_id',
      referencedColumnName: 'pregunta_id',
    },
  })
  preguntas: Pregunta[]
}
