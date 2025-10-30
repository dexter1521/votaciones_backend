import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';
import { Asistencia } from './asistencia.entity';
import { Pleno } from '../plenos/pleno.entity';
import { Magistrado } from '../magistrados/magistrado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, Pleno, Magistrado])],
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
})
export class AsistenciasModule {}
