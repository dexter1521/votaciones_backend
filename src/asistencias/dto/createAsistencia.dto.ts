import { IsInt, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAsistenciaDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id_pleno: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id_magistrado: number;

  @ApiProperty({
    example: 'presencial',
    enum: ['presencial', 'remoto', 'ausente'],
  })
  @IsNotEmpty()
  @IsIn(['presencial', 'remoto', 'ausente'])
  tipo_asistencia: 'presencial' | 'remoto' | 'ausente';
}
