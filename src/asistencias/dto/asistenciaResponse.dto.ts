import { ApiProperty } from '@nestjs/swagger';

export class AsistenciaResponseDto {
  @ApiProperty()
  id_asistencia: number;

  @ApiProperty()
  id_pleno: number;

  @ApiProperty()
  id_magistrado: number;

  @ApiProperty({ enum: ['presencial', 'remoto', 'ausente'] })
  tipo_asistencia: 'presencial' | 'remoto' | 'ausente';

  @ApiProperty()
  creado_en: Date;
}
