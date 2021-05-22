import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum ModalidadEnum {
  OBLIGATORIA = 'obligatoria',
  VOLUNTARIA = 'voluntaria',
  ALEATORIA = 'aleatoria',
}

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
