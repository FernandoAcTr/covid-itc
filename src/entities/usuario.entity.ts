import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Alerta } from './alerta.entity'
import { Rol } from './rol.entity'
import { Encuesta } from './encuesta.entity'
import { OrdenDePrueba } from './orden_de_prueba.entity'

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

  toJSON() {
    const { password, ...other } = this
    return other
  }
}
