import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Punto } from './punto.entity';
import { Pleno } from '../plenos/pleno.entity';
import { PuntosService } from './puntos.service';
import { PuntosController } from './puntos.controller';
import { PlenosModule } from '../plenos/plenos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Punto, Pleno]), PlenosModule],
  controllers: [PuntosController],
  providers: [PuntosService],
  exports: [PuntosService],
})
export class PuntosModule {}
