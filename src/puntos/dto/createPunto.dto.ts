import { IsNotEmpty, IsInt, IsString, IsOptional, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePuntoDto {
  @ApiProperty({ example: 1, description: 'id del pleno asociado' })
  @IsNotEmpty()
  @IsInt()
  id_pleno: number;

  @ApiProperty({ example: 'Descripción del punto' })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  orden?: number = 0;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  habilitado?: boolean = false;

  @ApiPropertyOptional({ example: 'pendiente' })
  @IsOptional()
  @IsIn(['pendiente', 'en_votacion', 'cerrado'])
  estado?: 'pendiente' | 'en_votacion' | 'cerrado' = 'pendiente';
}
