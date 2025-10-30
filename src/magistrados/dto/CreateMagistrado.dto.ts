import { IsNotEmpty, IsString, MaxLength, IsOptional, MinLength, IsBoolean } from 'class-validator';

export class CreateMagistradoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'El nombre completo debe tener al menos 3 caracteres' })
  @MaxLength(150, { message: 'El nombre completo no puede exceder 150 caracteres' })
  nombre_completo: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'El cargo no puede exceder 100 caracteres' })
  cargo: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean = true;
}
