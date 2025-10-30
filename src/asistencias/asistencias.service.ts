import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './asistencia.entity';
import { CreateAsistenciaDto } from './dto/createAsistencia.dto';
import { Pleno } from '../plenos/pleno.entity';
import { Magistrado } from '../magistrados/magistrado.entity';
import { buildNotFound } from '../votos/errors';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectRepository(Asistencia)
    private asistenciaRepo: Repository<Asistencia>,

    @InjectRepository(Pleno)
    private plenoRepo: Repository<Pleno>,

    @InjectRepository(Magistrado)
    private magistradoRepo: Repository<Magistrado>,
  ) {}

  async create(dto: CreateAsistenciaDto) {
    const { id_pleno, id_magistrado, tipo_asistencia } = dto;

    const plenoExists = await this.plenoRepo.exist({ where: { id_pleno } });
    if (!plenoExists) {
      throw new NotFoundException(buildNotFound('PLENO_NOT_FOUND', 'Pleno asociado no encontrado', { id_pleno }));
    }

    const magistradoExists = await this.magistradoRepo.exist({ where: { id_magistrado } });
    if (!magistradoExists) {
      throw new NotFoundException(
        buildNotFound('MAGISTRADO_NOT_FOUND', 'Magistrado asociado no encontrado', { id_magistrado }),
      );
    }

    const a: any = this.asistenciaRepo.create();
    a.pleno = { id_pleno };
    a.magistrado = { id_magistrado };
    a.tipo_asistencia = tipo_asistencia;
    return this.asistenciaRepo.save(a);
  }

  findAll() {
    return this.asistenciaRepo.find();
  }

  async findOne(id: number) {
  const found = await this.asistenciaRepo.findOne({ where: { id_asistencia: id }, relations: ['pleno', 'magistrado'] });
  if (!found) throw new NotFoundException(buildNotFound('ASISTENCIA_NOT_FOUND', 'Asistencia no encontrada', { id }));
  return found;
  }

  async remove(id: number) {
  const res = await this.asistenciaRepo.delete({ id_asistencia: id });
  if (res.affected === 0) throw new NotFoundException(buildNotFound('ASISTENCIA_NOT_FOUND', 'Asistencia no encontrada', { id }));
  return { affected: res.affected };
  }
}
