import { PartialType } from '@nestjs/mapped-types';
import { CreatePlenoDto } from './createPleno.dto';

export class UpdatePlenoDto extends PartialType(CreatePlenoDto) {}