import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm'
import { SolicitudConsulta } from './solicitud_consulta.entity'
import { Medicamento } from './medicamento.entity'

//Relation many to many between solicitud_consulta and medicamento
@Entity()
export class SolicitudMedicamento {
  @PrimaryGeneratedColumn()
  id_relation: number

  @ManyToOne(() => SolicitudConsulta, (solicitud) => solicitud.medicamentos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'solicitud_consulta_id' })
  solicitud_consulta: SolicitudConsulta

  @ManyToOne(() => Medicamento, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'medicamento_id' })
  medicamento: Medicamento

  @Column()
  receta: string

  toJSON() {
    const { solicitud_consulta, id_relation, ...other } = this
    return other
  }
}
