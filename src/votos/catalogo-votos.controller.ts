import { Controller, Get, Param } from '@nestjs/common';
import { CatalogoVotosService } from './catalogo-votos.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { plainToInstance } from 'class-transformer';
import { CatalogoVotosResponseDto } from './dto/CatalogoVotosResponse.dto';

@ApiTags('catalogo_votos')
@ApiBearerAuth()
@Controller('catalogo_votos')
export class CatalogoVotosController {
  constructor(private readonly service: CatalogoVotosService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Listar catálogo de votos' })
  async findAll() {
    const items = await this.service.findAll();
    return plainToInstance(CatalogoVotosResponseDto, items, { excludeExtraneousValues: true });
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const item = await this.service.findOne(+id);
    return plainToInstance(CatalogoVotosResponseDto, item, { excludeExtraneousValues: true });
  }
}
