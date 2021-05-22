import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Usuario } from './usuario.entity'
import { Respuesta } from './respuesta.entity'
import { OneToMany } from 'typeorm'

@Entity()
export class Encuesta {
  @PrimaryGeneratedColumn()
  encuesta_id: number

  @ManyToOne(() => Usuario, (usuario) => usuario.encuestas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario

  @Column({ type: 'text', nullable: true })
  otros_sintomas: string

  @CreateDateColumn()
  fecha_aplicacion: Date

  @OneToMany(() => Respuesta, (respuesta) => respuesta.encuesta, {
    cascade: true,
    eager: true,
  })
  respuestas: Respuesta[]

  toJSON() {
    let resp: any = this
    delete resp.usuario?.roles
    return resp
  }
}
