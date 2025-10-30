import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Punto } from '../puntos/punto.entity';
import { Magistrado } from '../magistrados/magistrado.entity';

@Entity('votos')
export class Voto {
  @PrimaryGeneratedColumn()
  id_voto: number;

  @ManyToOne(() => Punto, { nullable: false })
  @JoinColumn({ name: 'id_punto' })
  punto: Punto;

  @ManyToOne(() => Magistrado, { nullable: false })
  @JoinColumn({ name: 'id_magistrado' })
  magistrado: Magistrado;

  @Column({ name: 'id_voto_catalogo' })
  id_voto_catalogo: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
