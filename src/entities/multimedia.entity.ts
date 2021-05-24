import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Multimedia {
  @PrimaryGeneratedColumn('uuid')
  multimedia_id: string

  @Column()
  public_id: string

  @Column()
  url: string
}
