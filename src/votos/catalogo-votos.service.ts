import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoVotos } from './catalogo-votos.entity';

@Injectable()
export class CatalogoVotosService {
  constructor(
    @InjectRepository(CatalogoVotos)
    private readonly repo: Repository<CatalogoVotos>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id_voto_catalogo: id });
  }
}
