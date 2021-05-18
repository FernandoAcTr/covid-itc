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

  @Column()
  requireSuvey: Boolean

  @OneToMany(() => Alerta, (alerta) => alerta.usuario)
  alertas: Alerta[]

  @ManyToMany(() => Rol, { eager: true })
  @JoinTable({
    name: 'usuario_rol',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'usuario_id' },
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'rol_id' },
  })
  roles: Rol[]
}
