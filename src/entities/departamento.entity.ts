import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  departamento_id: number

  @Column()
  departamento: string
}
