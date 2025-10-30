import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Punto } from './punto.entity';
import { CreatePuntoDto } from './dto/createPunto.dto';
import { UpdatePuntoDto } from './dto/update-punto.dto';
import { Pleno } from '../plenos/pleno.entity';

@Injectable()
export class PuntosService {
  constructor(
    @InjectRepository(Punto)
    private readonly repo: Repository<Punto>,
    @InjectRepository(Pleno)
    private readonly plenoRepo: Repository<Pleno>,
  ) {}

  async create(dto: CreatePuntoDto) {
    const p = this.repo.create({
      descripcion: dto.descripcion,
      orden: dto.orden ?? 0,
      habilitado: dto.habilitado ?? false,
      estado: dto.estado ?? 'pendiente',
    } as any);

    if (dto.id_pleno) {
      const exists = await this.plenoRepo.exist({ where: { id_pleno: dto.id_pleno } });
      if (!exists)
        throw new NotFoundException({
          statusCode: 404,
          error: 'Pleno asociado no encontrado',
          code: 'PLENO_NOT_FOUND',
          id_pleno: dto.id_pleno,
        });
      // asignar relación por id para evitar carga completa
      (p as any).pleno = { id_pleno: dto.id_pleno } as any;
    }

    return this.repo.save(p);
  }

  findAll() {
    return this.repo.find({ relations: ['pleno'] });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id_punto: id }, relations: ['pleno'] });
    if (!e) throw new NotFoundException('Punto no encontrado');
    return e;
  }

  async update(id: number, dto: UpdatePuntoDto) {
    const toPreload: any = { id_punto: id, ...dto };
    if (dto.id_pleno) {
      const exists = await this.plenoRepo.exist({ where: { id_pleno: dto.id_pleno } });
      if (!exists)
        throw new NotFoundException({
          statusCode: 404,
          error: 'Pleno asociado no encontrado',
          code: 'PLENO_NOT_FOUND',
          id_pleno: dto.id_pleno,
        });
      toPreload.pleno = { id_pleno: dto.id_pleno } as any;
    }

    const p = await this.repo.preload(toPreload);
    if (!p) throw new NotFoundException('Punto no encontrado');
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    return this.repo.remove(p);
  }
}
