import {
  IsString,
  MaxLength,
  IsOptional,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateMagistradoDto {
  @ApiProperty({ example: 'María Pérez' })
  @IsString()
  @MinLength(3, {
    message: 'El nombre completo debe tener al menos 3 caracteres',
  })
  @MaxLength(150, {
    message: 'El nombre completo no puede exceder 150 caracteres',
  })
  nombre_completo: string;

  @ApiPropertyOptional({ example: 'Presidente' })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'El cargo no puede exceder 100 caracteres' })
  cargo?: string | null;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean = true;
}
