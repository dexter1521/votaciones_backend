import { PartialType } from '@nestjs/mapped-types';
import { CreateMagistradoDto } from './CreateMagistrado.dto';

export class UpdateMagistradoDto extends PartialType(CreateMagistradoDto) {}
