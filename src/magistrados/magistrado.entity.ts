import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('magistrados')
export class Magistrado {
  @PrimaryGeneratedColumn()
  id_magistrado: number;

  @Column({ length: 150 })
  nombre_completo: string;

  @Column({ length: 100, nullable: true })
  cargo?: string | null;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'creado_en' })
  creado_en: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizado_en: Date;
}
