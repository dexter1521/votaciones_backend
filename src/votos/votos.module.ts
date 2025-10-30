import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voto } from './voto.entity';
import { PuntosModule } from '../puntos/puntos.module';
import { MagistradosModule } from '../magistrados/magistrados.module';
import { CatalogoVotos } from './catalogo-votos.entity';
import { VotosService } from './votos.service';
import { VotosController } from './votos.controller';
import { CatalogoVotosService } from './catalogo-votos.service';
import { CatalogoVotosController } from './catalogo-votos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Voto, CatalogoVotos]), PuntosModule, MagistradosModule],
  providers: [VotosService, CatalogoVotosService],
  controllers: [VotosController, CatalogoVotosController],
  exports: [VotosService],
})
export class VotosModule {}
