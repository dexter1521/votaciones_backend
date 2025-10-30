import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find({
      select: ['id_usuario', 'nombre', 'usuario', 'rol', 'activo', 'creado_en'],
    });
  }

  findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({
      where: { usuario },
      select: ['id_usuario', 'nombre', 'usuario', 'rol', 'activo', 'creado_en'],
    });
  }

  // Método específico para login que incluye el password_hash
  findByUsuarioForAuth(usuario: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({
      where: { usuario },
      select: [
        'id_usuario',
        'nombre',
        'usuario',
        'password_hash',
        'rol',
        'activo',
      ],
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.usuariosRepository.findOne({
      where: { id_usuario: id },
      select: ['id_usuario', 'nombre', 'usuario', 'rol', 'activo', 'creado_en'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verificar si el usuario ya existe
    const existingUser = await this.findByUsuario(createUsuarioDto.usuario);
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    // Hash de la contraseña
    const password_hash = await hash(createUsuarioDto.password, 10);

    const usuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      password_hash,
    });

    const savedUser = await this.usuariosRepository.save(usuario);

    // Retornar sin el password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword as Usuario;
  }

  async changePassword(
    id: number,
    newPassword: string,
  ): Promise<{ message: string }> {
    const newPasswordHash = await hash(newPassword, 10);
    await this.usuariosRepository.update(id, {
      password_hash: newPasswordHash,
    });
    return { message: 'Contraseña actualizada correctamente' };
  }
}
