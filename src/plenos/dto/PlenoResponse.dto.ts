import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PlenoResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id_pleno: number;

  @Expose()
  @ApiProperty({ example: 'Descripción del pleno' })
  descripcion: string | null;

  @Expose()
  @ApiProperty({ example: '2025-10-30' })
  fecha: Date | string;

  @Expose()
  @ApiProperty({ example: 'pendiente' })
  estado: string;

  @Expose()
  @ApiProperty({
    example: 1,
    description: 'id del usuario que creó el pleno (creado_por)',
  })
  creado_por?: number | null;
}
