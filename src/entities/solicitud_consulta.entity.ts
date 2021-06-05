import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Usuario } from './usuario.entity'
import { Medico } from './medico.entity'
import { Multimedia } from './multimedia.entity'
import { SolicitudMedicamento } from './solicitud_medicamento.entity'

export enum ModalidadConsultaEnum {
  VIRTUAL = 'virtual',
  PRESCENCIAL = 'presencial',
}

export enum SolicitudStatusEnum {
  PENDIENTE = 'pendiente',
  ATENDIDA = 'atendida',
}

@Entity({ name: 'solicitud_de_consulta' })
export class SolicitudConsulta {
  @PrimaryGeneratedColumn('uuid')
  solicitud_id: string

  @Column({ type: 'text' })
  sintomas: string

  @Column({ type: 'enum', enum: ModalidadConsultaEnum })
  modalidad: ModalidadConsultaEnum

  @Column({
    type: 'enum',
    enum: SolicitudStatusEnum,
    default: SolicitudStatusEnum.PENDIENTE,
  })
  status: SolicitudStatusEnum

  @Column({ type: 'text', nullable: true })
  diagnostico: string

  @ManyToOne(() => Usuario, (usuario) => usuario.consultas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario

  @ManyToOne(() => Medico, (medico) => medico.consultas, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'medico_id' })
  medico: Medico

  @CreateDateColumn({ name: 'fecha_solicitud' })
  fecha_solicitud: Date

  @Column({ nullable: true })
  fecha_atencion: Date

  @ManyToMany(() => Multimedia, { cascade: true, eager: true })
  @JoinTable({
    name: 'solicitud_multimedia',
    joinColumn: {
      name: 'solicitud_id',
      referencedColumnName: 'solicitud_id',
    },
    inverseJoinColumn: {
      name: 'multimedia_id',
      referencedColumnName: 'multimedia_id',
    },
  })
  evidencias: Multimedia[]

  @OneToMany(
    () => SolicitudMedicamento,
    (relation) => relation.solicitud_consulta,
    { cascade: true, eager: true }
  )
  medicamentos: SolicitudMedicamento[]

  toJSON() {
    const solicitud: any = this
    delete solicitud.usuario?.rol
    delete solicitud.usuario?.habilitado
    return solicitud
  }
}
