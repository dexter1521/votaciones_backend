import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voto } from './voto.entity';
import { CreateVotoDto } from './dto/createVoto.dto';
import { Punto } from '../puntos/punto.entity';
import { Magistrado } from '../magistrados/magistrado.entity';
import { CatalogoVotos } from './catalogo-votos.entity';
import { buildNotFound, buildConflict } from './errors';

@Injectable()
export class VotosService {
  constructor(
    @InjectRepository(Voto)
    private readonly repo: Repository<Voto>,
    @InjectRepository(Punto)
    private readonly puntoRepo: Repository<Punto>,
    @InjectRepository(Magistrado)
    private readonly magistradoRepo: Repository<Magistrado>,
    @InjectRepository(CatalogoVotos)
    private readonly catalogoRepo: Repository<CatalogoVotos>,
  ) {}

  async create(dto: CreateVotoDto) {
    // comprobar existencia de entidades relacionadas
    const exPunto = await this.puntoRepo.exist({
      where: { id_punto: dto.id_punto },
    });
    if (!exPunto)
      throw new NotFoundException(
        buildNotFound('PUNTO_NOT_FOUND', 'Punto asociado no encontrado', {
          id_punto: dto.id_punto,
        }),
      );

    const exMag = await this.magistradoRepo.exist({
      where: { id_magistrado: dto.id_magistrado },
    });
    if (!exMag)
      throw new NotFoundException(
        buildNotFound(
          'MAGISTRADO_NOT_FOUND',
          'Magistrado asociado no encontrado',
          { id_magistrado: dto.id_magistrado },
        ),
      );

    const exCat = await this.catalogoRepo.exist({
      where: { id_voto_catalogo: dto.id_voto_catalogo },
    });
    if (!exCat)
      throw new NotFoundException(
        buildNotFound('CATALOGO_NOT_FOUND', 'Voto de catálogo no encontrado', {
          id_voto_catalogo: dto.id_voto_catalogo,
        }),
      );

    // comprobar voto duplicado (unique id_punto+id_magistrado)
    const exists = await this.repo.exist({
      where: {
        punto: { id_punto: dto.id_punto },
        magistrado: { id_magistrado: dto.id_magistrado },
      },
    });
    if (exists)
      throw new ConflictException(
        buildConflict(
          'VOTO_DUPLICADO',
          'Voto duplicado para el punto y magistrado indicados',
          {
            id_punto: dto.id_punto,
            id_magistrado: dto.id_magistrado,
          },
        ),
      );

    const v: any = this.repo.create();
    v.punto = { id_punto: dto.id_punto };
    v.magistrado = { id_magistrado: dto.id_magistrado };
    v.id_voto_catalogo = dto.id_voto_catalogo;

    return this.repo.save(v);
  }

  findAll() {
    return this.repo.find({ relations: ['punto', 'magistrado'] });
  }

  async findOne(id: number) {
    const v = await this.repo.findOne({
      where: { id_voto: id },
      relations: ['punto', 'magistrado'],
    });
    if (!v)
      throw new NotFoundException(
        buildNotFound('VOTO_NOT_FOUND', 'Voto no encontrado', { id_voto: id }),
      );
    return v;
  }

  async remove(id: number) {
    const v = await this.findOne(id);
    return this.repo.remove(v);
  }
}
