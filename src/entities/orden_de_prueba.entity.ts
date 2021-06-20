import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm'
import { Usuario } from './usuario.entity'
import { Medico } from './medico.entity'
import { TipoPrueba } from './tipo_prueba.entity'

export enum ResultadoEnum {
  NEGATIVO = 'NEGATIVO',
  POSITIVO = 'POSITIVO',
}

@Entity({ orderBy: { fecha_deteccion: 'DESC' } })
export class OrdenDePrueba {
  @PrimaryGeneratedColumn('uuid')
  orden_id: string

  @Column({ type: 'enum', enum: ResultadoEnum, nullable: true })
  resultado: ResultadoEnum

  @Column({ nullable: true })
  fecha_deteccion: Date

  @ManyToOne(() => Usuario, (usuario) => usuario.ordenes, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario

  @ManyToOne(() => Medico, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'medico_id' })
  medico: Medico

  @ManyToOne(() => TipoPrueba, { eager: true })
  @JoinColumn({ name: 'tipo_id' })
  tipo: TipoPrueba

  @Column({ default: false })
  alerta_enviada: boolean

  @CreateDateColumn()
  create_at: Date

  toJSON(): any {
    const orden: any = this
    delete orden.usuario.rol
    delete orden.usuario.habilitado
    delete orden.usuario.sospechoso
    delete orden.usuario.requireSurvey
    return orden
  }
}
