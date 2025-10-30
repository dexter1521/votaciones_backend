import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/createAsistencia.dto';
import { AsistenciaResponseDto } from './dto/asistenciaResponse.dto';
import { plainToInstance } from 'class-transformer';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('asistencias')
@ApiBearerAuth()
@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly service: AsistenciasService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Listar asistencias' })
  async findAll() {
    const items = await this.service.findAll();
    const normalized = items.map((i: any) => ({
      ...i,
      id_pleno: i.pleno ? i.pleno.id_pleno : null,
      id_magistrado: i.magistrado ? i.magistrado.id_magistrado : null,
    }));
    return plainToInstance(AsistenciaResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const item = await this.service.findOne(+id);
    const normalized = {
      ...item,
      id_pleno: (item as any).pleno ? (item as any).pleno.id_pleno : null,
      id_magistrado: (item as any).magistrado ? (item as any).magistrado.id_magistrado : null,
    };
    return plainToInstance(AsistenciaResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Post()
  @Auth(['oficial_mayor', 'secretario_general', 'admin'])
  async create(@Body() dto: CreateAsistenciaDto) {
    const item = await this.service.create(dto);
    const normalized = {
      ...item,
      id_pleno: (item as any).pleno ? (item as any).pleno.id_pleno : null,
      id_magistrado: (item as any).magistrado ? (item as any).magistrado.id_magistrado : null,
    };
    return plainToInstance(AsistenciaResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @Auth()
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
