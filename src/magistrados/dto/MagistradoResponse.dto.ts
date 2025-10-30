import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class MagistradoResponseDto {
  @Expose({ name: 'id_magistrado' })
  @ApiProperty({ example: 1 })
  id_magistrado: number;

  @Expose()
  @ApiProperty({ example: 'María Pérez' })
  nombre_completo: string;

  @Expose()
  @ApiProperty({ example: 'Presidente' })
  cargo: string;

  @Expose()
  @ApiProperty({ example: true })
  activo: boolean;

  @Expose()
  @Type(() => Date)
  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  creado_en?: Date;

  @Expose()
  @Type(() => Date)
  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  actualizado_en?: Date;
}