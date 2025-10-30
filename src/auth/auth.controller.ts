import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { Usuario } from '../usuarios/usuario.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UsuarioResponseDto } from '../usuarios/dto/usuario-response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(
      loginDto.usuario,
      loginDto.password,
    );
    return {
      access_token: result.access_token,
      user: plainToInstance(UsuarioResponseDto, result.user, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(
    @GetUser() usuario: Usuario,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      usuario.id_usuario,
      changePasswordDto,
    );
  }
}
