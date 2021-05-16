import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
import { Usuario } from './usuario.entity'
import { Medico } from './medico.entity'
import { TipoPrueba } from './tipo_prueba.entity'

export enum ResultadoEnum {
  NEGATIVO = 'NEGATIVO',
  POSITIVO = 'POSITIVO',
}

@Entity()
export class OrdenDePrueba {
  @PrimaryGeneratedColumn('uuid')
  orden_id: string

  @Column({ type: 'enum', enum: ResultadoEnum, nullable: true })
  resultado: ResultadoEnum

  @ManyToOne(() => Usuario, { cascade: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario

  @ManyToOne(() => Medico)
  @JoinColumn({ name: 'medico_id' })
  medico: Medico

  @ManyToOne(() => TipoPrueba, { eager: true })
  @JoinColumn({ name: 'tipo_id' })
  tipo: TipoPrueba
}
