import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class VotoResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_voto: number;

  @Expose()
  @ApiProperty({ example: 1 })
  id_punto: number;

  @Expose()
  @ApiProperty({ example: 1 })
  id_magistrado: number;

  @Expose()
  @ApiProperty({ example: 1 })
  id_voto_catalogo: number;

  @Expose()
  @ApiProperty({ example: '2025-10-29T19:56:47Z' })
  timestamp: Date;
}
