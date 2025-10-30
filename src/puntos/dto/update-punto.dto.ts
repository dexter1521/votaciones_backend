import { PartialType } from '@nestjs/mapped-types';
import { CreatePuntoDto } from './createPunto.dto';

export class UpdatePuntoDto extends PartialType(CreatePuntoDto) {}
