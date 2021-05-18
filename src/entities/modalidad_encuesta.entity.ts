import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ModalidadEnum } from './encuesta.entity'

@Entity()
export class ModalidadEncuesta {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: ModalidadEnum,
  })
  modalidad: ModalidadEnum

  @UpdateDateColumn()
  update_at: Date
}
