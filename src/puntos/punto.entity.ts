import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pleno } from '../plenos/pleno.entity';

@Entity('puntos')
export class Punto {
  @PrimaryGeneratedColumn()
  id_punto: number;

  @ManyToOne(() => Pleno, { nullable: false })
  @JoinColumn({ name: 'id_pleno' })
  pleno: Pleno;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  orden: number;

  @Column({ default: false })
  habilitado: boolean;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'en_votacion', 'cerrado'],
    default: 'pendiente',
  })
  estado: 'pendiente' | 'en_votacion' | 'cerrado';
}
