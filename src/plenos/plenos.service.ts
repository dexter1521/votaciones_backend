import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pleno } from './pleno.entity';
import { CreatePlenoDto } from './dto/createPleno.dto';
import { UpdatePlenoDto } from './dto/update-pleno.dto';

@Injectable()
export class PlenosService {
  constructor(
    @InjectRepository(Pleno)
    private readonly repo: Repository<Pleno>,
  ) {}

  async create(dto: CreatePlenoDto) {
    const p = this.repo.create({
      descripcion: dto.descripcion ?? null,
      fecha: dto.fecha,
      estado: dto.estado ?? 'pendiente',
    } as any);

    if (dto.creado_por) {
      // set relation by id to avoid extra query
      (p as any).creado_por = { id_usuario: dto.creado_por } as any;
    }

    return this.repo.save(p);
  }

  findAll() {
    return this.repo.find({ relations: ['creado_por'] });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({
      where: { id_pleno: id },
      relations: ['creado_por'],
    });

    if (!e) throw new NotFoundException('Pleno no encontrado');
    return e;
  }

  async update(id: number, dto: UpdatePlenoDto) {
    const toPreload: any = { id_pleno: id, ...dto };
    if (dto.fecha) toPreload.fecha = dto.fecha;
    if (dto.creado_por) toPreload.creado_por = { id_usuario: dto.creado_por } as any;

    const p = await this.repo.preload(toPreload);
    if (!p) throw new NotFoundException('Pleno no encontrado');
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    return this.repo.remove(p);
  }
}
