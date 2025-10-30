import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(4, { message: 'La contraseña actual es requerida.' })
  oldPassword: string;

  @IsString()
  @MinLength(4, {
    message: 'La nueva contraseña debe tener al menos 4 caracteres',
  })
  newPassword: string;
}