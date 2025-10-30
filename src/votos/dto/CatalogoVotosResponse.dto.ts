import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CatalogoVotosResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_voto_catalogo: number;

  @Expose()
  @ApiProperty({ example: 'A favor', enum: ['A favor', 'En contra', 'Abstención'], description: 'Opciones de voto disponibles' })
  descripcion: 'A favor' | 'En contra' | 'Abstención';
}
