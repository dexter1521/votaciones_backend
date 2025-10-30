import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('catalogo_votos')
export class CatalogoVotos {
  @PrimaryGeneratedColumn({ name: 'id_voto_catalogo' })
  id_voto_catalogo: number;

  @Column({ type: 'enum', enum: ['A favor', 'En contra', 'Abstención'] })
  descripcion: 'A favor' | 'En contra' | 'Abstención';
}
