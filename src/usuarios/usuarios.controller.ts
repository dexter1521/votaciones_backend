import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @Auth()
  async findAll() {
    const users = await this.usuariosService.findAll();
    return plainToInstance(UsuarioResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usuariosService.findOne(id);
    return plainToInstance(UsuarioResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @Auth(['admin']) // Solo admins pueden crear usuarios
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const user = await this.usuariosService.create(createUsuarioDto);
    return plainToInstance(UsuarioResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
