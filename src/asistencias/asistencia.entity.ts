import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Pleno } from '../plenos/pleno.entity';
import { Magistrado } from '../magistrados/magistrado.entity';

@Entity('asistencias')
export class Asistencia {
  @PrimaryGeneratedColumn({ name: 'id_asistencia' })
  id_asistencia: number;

  @ManyToOne(() => Pleno, { nullable: false })
  @JoinColumn({ name: 'id_pleno' })
  pleno: Pleno;

  @ManyToOne(() => Magistrado, { nullable: false })
  @JoinColumn({ name: 'id_magistrado' })
  magistrado: Magistrado;

  @Column({
    type: 'enum',
    enum: ['presencial', 'remoto', 'ausente'],
  })
  tipo_asistencia: 'presencial' | 'remoto' | 'ausente';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
