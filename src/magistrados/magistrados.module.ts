import { Module } from '@nestjs/common';
import { MagistradosService } from './magistrados.service';
import { MagistradosController } from './magistrados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magistrado } from './magistrado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Magistrado])],
  providers: [MagistradosService],
  controllers: [MagistradosController],
  exports: [MagistradosService],
})
export class MagistradosModule {}
