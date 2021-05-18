import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum RolEnum {
  ESTUDIANTE = 'estudiante',
  PERSONAL = 'personal',
  MONITOR = 'monitor',
  ADMINISTRADOR = 'administrador',
  DIRECTIVO = 'directivo',
  MEDICO = 'medico',
}

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  rol_id: number

  @Column({ type: 'enum', enum: RolEnum, unique: true })
  rol: RolEnum
}
