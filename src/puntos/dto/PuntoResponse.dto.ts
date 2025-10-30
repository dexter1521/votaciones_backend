import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PuntoResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_punto: number;

  @Expose()
  @ApiProperty({ example: 1 })
  id_pleno: number;

  @Expose()
  @ApiProperty({ example: 'Descripción del punto' })
  descripcion: string;

  @Expose()
  @ApiProperty({ example: 0 })
  orden: number;

  @Expose()
  @ApiProperty({ example: false })
  habilitado: boolean;

  @Expose()
  @ApiProperty({ example: 'pendiente' })
  estado: string;
}
