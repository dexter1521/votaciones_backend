import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PlenosService } from './plenos.service';
import { CreatePlenoDto } from './dto/createPleno.dto';
import { UpdatePlenoDto } from './dto/update-pleno.dto';
import { PlenoResponseDto } from './dto/PlenoResponse.dto';
import { plainToInstance } from 'class-transformer';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('plenos')
@ApiBearerAuth()
@Controller('plenos')
export class PlenosController {
  constructor(private readonly service: PlenosService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Listar plenos' })
  async findAll() {
    const items = await this.service.findAll();
    const normalized = items.map((i: any) => ({
      ...i,
      creado_por: i.creado_por ? i.creado_por.id_usuario : null,
    }));
    return plainToInstance(PlenoResponseDto, normalized, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    const item = await this.service.findOne(+id);
    const normalized = {
      ...item,
      creado_por: (item as any).creado_por
        ? (item as any).creado_por.id_usuario
        : null,
    };
    return plainToInstance(PlenoResponseDto, normalized, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @Auth()
  async create(@Body() dto: CreatePlenoDto) {
    const item = await this.service.create(dto);
    const normalized = {
      ...item,
      creado_por: (item as any).creado_por
        ? (item as any).creado_por.id_usuario
        : null,
    };
    return plainToInstance(PlenoResponseDto, normalized, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() dto: UpdatePlenoDto) {
    const item = await this.service.update(+id, dto);
    const normalized = {
      ...item,
      creado_por: (item as any).creado_por
        ? (item as any).creado_por.id_usuario
        : null,
    };
    return plainToInstance(PlenoResponseDto, normalized, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @Auth()
  async remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
