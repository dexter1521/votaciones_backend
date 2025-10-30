import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MagistradosService } from './magistrados.service';
import { CreateMagistradoDto } from './dto/CreateMagistrado.dto';
import { plainToInstance } from 'class-transformer';
import { MagistradoResponseDto } from './dto/MagistradoResponse.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('magistrados')
export class MagistradosController {
  constructor(private readonly magistradosService: MagistradosService) {}

  @Get()
  @Auth()
  async findAll() {
    const list = await this.magistradosService.findAll();
    return plainToInstance(MagistradoResponseDto, list, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const m = await this.magistradosService.findOne(id);
    return plainToInstance(MagistradoResponseDto, m, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @Auth(['admin'])
  async create(@Body() createMagistradoDto: CreateMagistradoDto) {
    const m = await this.magistradosService.create(createMagistradoDto);
    return plainToInstance(MagistradoResponseDto, m, {
      excludeExtraneousValues: true,
    });
  }
}
