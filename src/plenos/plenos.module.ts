import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pleno } from './pleno.entity';
import { PlenosService } from './plenos.service';
import { PlenosController } from './plenos.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pleno]), UsuariosModule],
  controllers: [PlenosController],
  providers: [PlenosService],
})
export class PlenosModule {}
