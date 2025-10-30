import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VotosService } from './votos.service';
import { CreateVotoDto } from './dto/createVoto.dto';
import { VotoResponseDto } from './dto/VotoResponse.dto';
import { plainToInstance } from 'class-transformer';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('votos')
@ApiBearerAuth()
@Controller('votos')
export class VotosController {
  constructor(private readonly service: VotosService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Listar votos' })
  async findAll() {
    const items = await this.service.findAll();
    const normalized = items.map((i: any) => ({
      id_voto: i.id_voto,
      id_punto: i.punto?.id_punto ?? null,
      id_magistrado: i.magistrado?.id_magistrado ?? null,
      id_voto_catalogo: i.id_voto_catalogo,
      timestamp: i.timestamp,
    }));
    return plainToInstance(VotoResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const item = await this.service.findOne(+id);
    const normalized = {
      id_voto: (item as any).id_voto,
      id_punto: (item as any).punto?.id_punto ?? null,
      id_magistrado: (item as any).magistrado?.id_magistrado ?? null,
      id_voto_catalogo: (item as any).id_voto_catalogo,
      timestamp: (item as any).timestamp,
    };
    return plainToInstance(VotoResponseDto, normalized, { excludeExtraneousValues: true });
  }

  @Post()
  @Auth(['oficial_mayor', 'secretario_general', 'admin'])
  async create(@Body() dto: CreateVotoDto) {
    const item = await this.service.create(dto);
    const normalized = {
      id_voto: (item as any).id_voto,
      id_punto: (item as any).punto?.id_punto ?? dto.id_punto,
      id_magistrado: (item as any).magistrado?.id_magistrado ?? dto.id_magistrado,
      id_voto_catalogo: (item as any).id_voto_catalogo,
      timestamp: (item as any).timestamp,
    };
    return plainToInstance(VotoResponseDto, normalized, { excludeExtraneousValues: true });
  }
}
