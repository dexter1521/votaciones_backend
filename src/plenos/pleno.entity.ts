import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('plenos')
export class Pleno {
  @PrimaryGeneratedColumn()
  id_pleno: number;
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'date', name: 'fecha' })
  fecha: Date; // fecha del pleno

  @Column({
    type: 'enum',
    enum: ['pendiente', 'en_sesion', 'cerrado'],
    default: 'pendiente',
  })
  estado: 'pendiente' | 'en_sesion' | 'cerrado';

  // relación con el usuario que creó el pleno (creado_por)
  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'creado_por' })
  creado_por?: Usuario | null;
}
