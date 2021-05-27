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
import { Medico } from './medico.entity'
import { Multimedia } from './multimedia.entity'

export enum ModalidadConsultaEnum {
  VIRTUAL = 'virtual',
  PRESCENCIAL = 'presencial',
}

export enum StatusEnum {
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

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDIENTE })
  status: StatusEnum

  @Column({ type: 'text', nullable: true })
  receta: string

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

  toJSON() {
    let solicitud: any = this
    delete solicitud.usuario?.roles
    delete solicitud.usuario?.habilitado
    return solicitud
  }
}
