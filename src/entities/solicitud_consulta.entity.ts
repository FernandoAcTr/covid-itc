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

export enum ModalidadEnum {
  VIRTUAL = 'virtual',
  PRESCENCIAL = 'prescencial',
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

  @Column({ type: 'enum', enum: ModalidadEnum })
  modalidad: ModalidadEnum

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDIENTE })
  status: StatusEnum

  @Column({ type: 'text', nullable: true })
  receta: string

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario

  @ManyToOne(() => Medico, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'medico_id' })
  medico: Medico

  @CreateDateColumn({ name: 'fecha_solicitud' })
  fecha_solicitud: Date

  @Column({ nullable: true })
  fecha_atencion: Date

  @ManyToMany(() => Multimedia)
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
}
