import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Departamento } from './departamento.entity'
import { Estudiante } from './estudiante.entity'

@Entity()
export class Carrera {
  @PrimaryColumn()
  carrera_id: number

  @Column()
  carrera: string

  @ManyToOne(() => Departamento, {
    eager: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({name: 'departamento_id'})
  departamento: Departamento

  @OneToMany(() => Estudiante, (estudiante) => estudiante.carrera)
  estudiantes: Estudiante[]
}
