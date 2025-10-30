import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('magistrados')
export class Magistrado {
  @PrimaryGeneratedColumn({ name: 'id_magistrado' })
  id_magistrado: number;

  @Column({ length: 150 })
  nombre_completo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cargo?: string | null;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  activo: boolean;

  @CreateDateColumn({ name: 'creado_en', type: 'datetime' })
  creado_en: Date;

  @UpdateDateColumn({ name: 'actualizado_en', type: 'datetime' })
  actualizado_en: Date;
}
