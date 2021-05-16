import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Pregunta {
  @PrimaryGeneratedColumn()
  pregunta_id: number

  @Column()
  pregunta: string
}
