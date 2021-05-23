import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
  habilitado: Boolean

  @Column({ default: false })
  sospechoso: Boolean

  @Column({ name: 'require_survey' })
  requireSurvey: Boolean

  @OneToMany(() => Alerta, (alerta) => alerta.usuario)
  alertas: Alerta[]

  @ManyToMany(() => Rol, { eager: true })
  @JoinTable({
    name: 'usuario_rol',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'usuario_id' },
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'rol_id' },
  })
  roles: Rol[]

  @OneToMany(() => Encuesta, (encuesta) => encuesta.usuario)
  encuestas: Encuesta[]

  @OneToMany(() => OrdenDePrueba, (orden) => orden.usuario)
  ordenes: OrdenDePrueba[]

  @OneToOne(() => Estudiante, (estudiante) => estudiante.usuario)
  estudiante: Estudiante

  @OneToOne(() => Personal, (personal) => personal.usuario)
  personal: Personal

  @OneToOne(() => Medico, (medico) => medico.usuario)
  medico: Medico

  toJSON() {
    const { password, ...other } = this as any
    if (other.estudiante === null) delete other.estudiante
    if (other.personal === null) delete other.personal
    if (other.medico === null) delete other.medico
    return other
  }
}
