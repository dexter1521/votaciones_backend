import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { compare } from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(usuario: string, password: string) {
    const user = await this.usuariosService.findByUsuarioForAuth(usuario);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const match = await compare(password, user.password_hash);
    if (!match) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = {
      sub: user.id_usuario,
      rol: user.rol,
      nombre: user.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        usuario: user.usuario,
        rol: user.rol,
      },
    };
  }

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.usuariosService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordMatching = await compare(
      changePasswordDto.oldPassword,
      user.password_hash,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('La contraseña actual es incorrecta');
    }

    return this.usuariosService.changePassword(
      userId,
      changePasswordDto.newPassword,
    );
  }


}
