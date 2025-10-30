import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVotoDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id_punto: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id_magistrado: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id_voto_catalogo: number;
}
