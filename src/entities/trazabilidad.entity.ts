import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'
import { Usuario } from './usuario.entity'

@Entity()
export class Trazabilidad {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  trazabilidad_id: number

  @ManyToOne(() => Usuario)
  @JoinColumn({
    name: 'usuario_id',
  })
  usuario: Usuario

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({
    name: 'contacto',
  })
  contacto: Usuario

  @Column()
  fecha: Date

  @Column({ default: false })
  avisado: boolean

  toJSON(): any {
    const trazabilidad: any = this
    delete trazabilidad.contacto.rol
    delete trazabilidad.contacto.requireSurvey
    delete trazabilidad.contacto.sospechoso
    delete trazabilidad.contacto.habilitado
    return trazabilidad
  }
}
