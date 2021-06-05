import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Alerta } from './alerta.entity'
import { Rol } from './rol.entity'
import { Encuesta } from './encuesta.entity'
import { OrdenDePrueba } from './orden_de_prueba.entity'
import { Estudiante } from './estudiante.entity'
import { Personal } from './personal.entity'
import { Medico } from './medico.entity'
import { Trazabilidad } from './trazabilidad.entity'
import { SolicitudConsulta } from './solicitud_consulta.entity'
import { JoinColumn } from 'typeorm'

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  usuario_id: string

  @Column({ length: 100, unique: true })
  email: string

  @Column({ length: 72 })
  password: string

  @Column({
    default: true,
  })
  habilitado: boolean

  @Column({ default: false })
  sospechoso: boolean

  @Column({ name: 'require_survey' })
  requireSurvey: boolean

  @OneToMany(() => Alerta, (alerta) => alerta.usuario)
  alertas: Alerta[]

  @ManyToOne(() => Rol, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'rol_id',
  })
  rol: Rol

  @OneToMany(() => Encuesta, (encuesta) => encuesta.usuario)
  encuestas: Encuesta[]

  @OneToMany(() => OrdenDePrueba, (orden) => orden.usuario)
  ordenes: OrdenDePrueba[]

  @OneToMany(() => SolicitudConsulta, (solicitud) => solicitud.usuario)
  consultas: SolicitudConsulta[]

  @OneToOne(() => Estudiante, (estudiante) => estudiante.usuario)
  estudiante: Estudiante

  @OneToOne(() => Personal, (personal) => personal.usuario)
  personal: Personal

  @OneToOne(() => Medico, (medico) => medico.usuario)
  medico: Medico

  @OneToMany(() => Trazabilidad, (trazabilidad) => trazabilidad.usuario)
  trazabilidad: Trazabilidad[]

  toJSON() {
    const { password, ...other } = this as any
    if (other.estudiante === null) delete other.estudiante
    if (other.personal === null) delete other.personal
    if (other.medico === null) delete other.medico
    return other
  }
}
