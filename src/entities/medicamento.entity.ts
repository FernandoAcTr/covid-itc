import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Medicamento {
  @PrimaryGeneratedColumn()
  medicamento_id: number

  @Column()
  descripcion: string
}
