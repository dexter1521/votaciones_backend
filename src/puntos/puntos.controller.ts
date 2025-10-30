import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PuntosService } from './puntos.service';
import { CreatePuntoDto } from './dto/createPunto.dto';
import { UpdatePuntoDto } from './dto/update-punto.dto';
import { PuntoResponseDto } from './dto/PuntoResponse.dto';
import { plainToInstance } from 'class-transformer';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('puntos')
@ApiBearerAuth()
@Controller('puntos')
export class PuntosController {
  constructor(private readonly service: PuntosService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Listar puntos' })
  async findAll() {
    const items = await this.service.findAll();
    const normalized = items.map((i: any) => ({
      ...i,
      id_pleno: i.pleno ? i.pleno.id_pleno : null,
    }));
    return plainToInstance(PuntoResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const item = await this.service.findOne(+id);
    const normalized = { ...item, id_pleno: (item as any).pleno ? (item as any).pleno.id_pleno : null };
    return plainToInstance(PuntoResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Post()
  @Auth(['oficial_mayor', 'secretario_general', 'admin'])
  async create(@Body() dto: CreatePuntoDto) {
    const item = await this.service.create(dto);
    const normalized = { ...item, id_pleno: (item as any).pleno ? (item as any).pleno.id_pleno : null };
    return plainToInstance(PuntoResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() dto: UpdatePuntoDto) {
    const item = await this.service.update(+id, dto);
    const normalized = { ...item, id_pleno: (item as any).pleno ? (item as any).pleno.id_pleno : null };
    return plainToInstance(PuntoResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @Auth()
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
