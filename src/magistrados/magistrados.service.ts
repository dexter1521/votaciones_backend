import { Injectable, NotFoundException } from '@nestjs/common';
import { Magistrado } from './magistrado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMagistradoDto } from './dto/CreateMagistrado.dto';
import { UpdateMagistradoDto } from './dto/UpdateMagistrado.dto';

@Injectable()
export class MagistradosService {
  constructor(
    @InjectRepository(Magistrado)
    private readonly magistradosRepository: Repository<Magistrado>,
  ) {}

  async findAll(): Promise<Magistrado[]> {
    return this.magistradosRepository.find();
  }

  async findOne(id: number): Promise<Magistrado> {
    const magistrado = await this.magistradosRepository.findOne({
      where: { id_magistrado: id },
    });
    if (!magistrado) {
      throw new NotFoundException(`Magistrado con ID ${id} no encontrado`);
    }
    return magistrado;
  }

  async create(createMagistradoDto: CreateMagistradoDto): Promise<Magistrado> {
    const magistrado = this.magistradosRepository.create(createMagistradoDto);
    return this.magistradosRepository.save(magistrado);
  }

  async update(
    id: number,
    updateMagistradoDto: UpdateMagistradoDto,
  ): Promise<Magistrado> {
    // Usar preload para mantener consistencia (si el registr existe lo actualizamos)
    const magistrado = await this.magistradosRepository.preload({
      id_magistrado: id,
      ...updateMagistradoDto,
    } as Partial<Magistrado>);
    if (!magistrado) {
      throw new NotFoundException(`Magistrado con ID ${id} no encontrado`);
    }
    const updatedMagistrado = await this.magistradosRepository.save(magistrado);
    if (!updatedMagistrado) {
      throw new NotFoundException(`Magistrado con ID ${id} no encontrado`);
    }
    return updatedMagistrado;
  }

  async remove(id: number): Promise<void> {
    const result = await this.magistradosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Magistrado con ID ${id} no encontrado`);
    }
  }
}
