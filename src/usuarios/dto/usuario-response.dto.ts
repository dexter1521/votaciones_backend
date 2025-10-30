import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// DTO pensado para ClassSerializerInterceptor - usa @Exclude/@Expose
@Exclude()
export class UsuarioResponseDto {
  @Expose({ name: 'id_usuario' })
  @ApiProperty({ description: 'Identificador del usuario', example: 1 })
  id_usuario?: number;

  @Expose()
  @ApiProperty({
    description: 'Nombre completo',
    example: 'Administrador General',
  })
  nombre?: string;

  @Expose()
  @ApiProperty({ description: 'Nombre de usuario (login)', example: 'admin' })
  usuario?: string;

  @Expose()
  @ApiProperty({ description: 'Rol del usuario', example: 'oficial_mayor' })
  rol?: string;

  @Expose()
  @ApiProperty({ description: 'Activo', example: true })
  activo?: boolean;

  @Expose()
  @Type(() => Date)
  @ApiProperty({
    description: 'Fecha de creación',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  creado_en?: Date;

  @Expose()
  @Type(() => Date)
  @ApiProperty({
    description: 'Fecha de última actualización',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  actualizado_en?: Date;
}
