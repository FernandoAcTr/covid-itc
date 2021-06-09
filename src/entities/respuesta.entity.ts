import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { Encuesta } from './encuesta.entity'
import { Pregunta } from './pregunta.entity'
import { Column } from 'typeorm'

export enum RespuestaEnum {
  SI = 'si',
  NO = 'no',
}

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  detalle_id: number

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.respuestas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'encuesta_id' })
  encuesta: Encuesta

  @ManyToOne(() => Pregunta, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'pregunta_id' })
  pregunta: Pregunta

  @Column({ type: 'enum', enum: RespuestaEnum, nullable: false })
  respuesta: RespuestaEnum

  toJSON(): any {
    const { detalle_id, ...other } = this
    return other
  }
}
