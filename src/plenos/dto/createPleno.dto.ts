import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  IsIn,
  IsDateString,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlenoDto {
  @ApiProperty({ example: 'Reunión ordinaria' })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  descripcion?: string;

  @ApiProperty({
    example: '2025-10-30',
    description: 'Fecha del pleno (YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @ApiPropertyOptional({ example: 'pendiente' })
  @IsOptional()
  @IsIn(['pendiente', 'en_sesion', 'cerrado'], {
    message: 'El estado debe ser pendiente, en_sesion o cerrado',
  })
  estado?: 'pendiente' | 'en_sesion' | 'cerrado' = 'pendiente';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  creado_por?: number;
}
