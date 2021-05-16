import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TipoPrueba {
  @PrimaryGeneratedColumn()
  tipo_id: number

  @Column()
  descripcion: string
}
